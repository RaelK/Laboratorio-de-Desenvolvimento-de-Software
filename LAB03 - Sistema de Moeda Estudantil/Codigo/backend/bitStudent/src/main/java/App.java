import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = { "model", "repository", "service", "controller", "controller.dto", "config", "security" })
@EnableJpaRepositories(basePackages = { "repository" })
@EntityScan(basePackages = { "model" })
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
