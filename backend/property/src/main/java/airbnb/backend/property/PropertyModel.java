package airbnb.backend.property;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Getter
@RequiredArgsConstructor
@Table(name = "Property")
public class PropertyModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String ownername;
    private String owneremail;
    private String description;
    private String address;
    private String city;
    private String state;
    private String zip;
    // private String country;
    // private String type;
    private String image;
    private double price;
    private float rating = 0;
    private int num_reviews = 0;
    private int num_bedrooms;
    private int num_bathrooms;
}
