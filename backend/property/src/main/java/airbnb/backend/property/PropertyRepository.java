package airbnb.backend.property;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

import javax.swing.text.html.Option;

public interface PropertyRepository extends JpaRepository<PropertyModel, Long> {

    @Query(value = "SELECT p FROM PropertyModel p WHERE p.city = ?1 ")
    List<PropertyModel> findByCity(@Param("city") String city);

    @Query(value = "SELECT p FROM PropertyModel p WHERE p.state = ?1 ")
    List<PropertyModel> findByState(@Param("state") String state);

    // find by zip
    @Query(value = "SELECT p FROM PropertyModel p WHERE p.zip = ?1 ")
    List<PropertyModel> findByZip(@Param("zip") String zip);

    // find by price, return all properties with price less than or equal to the
    // given price
    @Query(value = "SELECT p FROM PropertyModel p WHERE p.price <= ?1 ")
    List<PropertyModel> findByPrice(@Param("price") double price);

    // find by property name
    @Query(value = "SELECT p FROM PropertyModel p WHERE p.name = ?1 ")
    Optional<PropertyModel> findByName(@Param("name") String name);

}
