package airbnb.backend.property;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.util.Optional;
import java.time.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.validation.BindingResult;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller for the property details.
 */
@Slf4j
@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/property")
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    @RequestMapping("/ping")
    public ResponseEntity<?> getAction() {
        System.out.println("getAction");
        return ResponseEntity.ok("Property Server Is Running");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<PropertyModel>> getProperty(@PathVariable Long id, Model model) {
        Optional<PropertyModel> property = propertyRepository.findById(id);
        if (property.isPresent()) {
            return ResponseEntity.ok(property);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // get all properties
    @GetMapping("/all")
    public ResponseEntity<List<PropertyModel>> getAllProperties() {
        List<PropertyModel> properties = propertyRepository.findAll();
        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(properties);
        }
    }

    // get all properties by city
    @GetMapping("/city/{city}")
    public ResponseEntity<List<PropertyModel>> getAllPropertiesByCity(@PathVariable String city) {
        List<PropertyModel> properties = propertyRepository.findByCity(city);
        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(properties);
        }
    }

    // get all property by state
    @GetMapping("/state/{state}")
    public ResponseEntity<List<PropertyModel>> getAllPropertiesByState(@PathVariable String state) {
        List<PropertyModel> properties = propertyRepository.findByState(state);
        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(properties);
        }
    }

    // get all properties by zipcode
    @GetMapping("/zipcode/{zipcode}")
    public ResponseEntity<List<PropertyModel>> getAllPropertiesByZipcode(@PathVariable String zipcode) {
        List<PropertyModel> properties = propertyRepository.findByZip(zipcode);
        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(properties);
        }
    }

    // get all properties by price
    @GetMapping("/price/{price}")
    public ResponseEntity<List<PropertyModel>> getAllPropertiesByPrice(@PathVariable String price) {
        List<PropertyModel> properties = propertyRepository.findByPrice(Double.parseDouble(price));
        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(properties);
        }
    }

    // POST Methods

    // create a new property
    @PostMapping("/create")
    public ResponseEntity<PropertyModel> createProperty(@RequestBody PropertyModel property) {

        // validate and check for null values in property data
        if (property.getName().equals(null) || property.getOwnername().equals(null)
                || property.getAddress().equals(null) || property.getCity().equals(null)
                || property.getState().equals(null) || property.getZip().equals(null)
                || property.getDescription().equals(null)
                || property.getImage().equals(null)) {
            return ResponseEntity.badRequest().build();
        }

        // check if property already exists
        Optional<PropertyModel> propertyExists = propertyRepository.findByName(property.getName());
        if (propertyExists.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        propertyRepository.save(property);
        return ResponseEntity.ok(property);
    }

    // update a property
    @PutMapping("/update")
    public ResponseEntity<PropertyModel> updateProperty(@RequestBody PropertyModel property) {

        // validate and check for null values in property data
        if (property.getName().equals(null) || property.getOwnername().equals(null)
                || property.getAddress().equals(null) || property.getCity().equals(null)
                || property.getState().equals(null) || property.getZip().equals(null)
                || property.getDescription().equals(null)
                || property.getImage().equals(null)) {
            return ResponseEntity.badRequest().build();
        }

        // check if property already exists
        Optional<PropertyModel> propertyExists = propertyRepository.findByName(property.getName());
        if (!propertyExists.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        propertyExists.get().setName(property.getName());
        propertyExists.get().setOwnername(property.getOwnername());
        propertyExists.get().setAddress(property.getAddress());
        propertyExists.get().setCity(property.getCity());
        propertyExists.get().setState(property.getState());
        propertyExists.get().setZip(property.getZip());
        propertyExists.get().setDescription(property.getDescription());
        propertyExists.get().setImage(property.getImage());
        propertyExists.get().setPrice(property.getPrice());

        propertyRepository.save(propertyExists.get());
        propertyExists = propertyRepository.findByName(property.getName());

        return ResponseEntity.ok(propertyExists.get());
    }

    // delete a property
    @DeleteMapping("/delete")
    public ResponseEntity<PropertyModel> deleteProperty(@RequestBody PropertyModel property) {

        // validate and check for null values in property data
        if (property.getName().equals(null) || property.getOwnername().equals(null)
                || property.getAddress().equals(null) || property.getCity().equals(null)
                || property.getState().equals(null) || property.getZip().equals(null)
                || property.getDescription().equals(null)
                || property.getImage().equals(null)) {
            return ResponseEntity.badRequest().build();
        }

        // check if property already exists
        Optional<PropertyModel> propertyExists = propertyRepository.findByName(property.getName());
        if (!propertyExists.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        propertyRepository.delete(propertyExists.get());
        return ResponseEntity.ok(propertyExists.get());
    }

    /**
     * Helper Error logger & mapper class
     */
    class ErrorMap {
        public Map<String, String> errors;

        public ErrorMap() {
            errors = new HashMap<>();
        }

        public void addError(String key, String value) {
            errors.put(key, value);
        }

        public void printErrors() {
            System.out.println("---------------------------------");
            System.out.println("Errors:");
            for (String key : errors.keySet()) {
                System.out.println(key + ": " + errors.get(key));
            }
        }
    }
}
