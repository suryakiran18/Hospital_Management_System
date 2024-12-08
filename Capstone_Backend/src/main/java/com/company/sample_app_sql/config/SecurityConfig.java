package com.company.sample_app_sql.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
    @Configuration
    public class SecurityConfig implements WebMvcConfigurer{

        // Password encoder bean
        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

        // CORS configuration
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            // Allow CORS requests from your Angular frontend URL
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:4200") // Frontend URL
                    .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods
                    .allowedHeaders("*") // Allowed headers
                    .allowCredentials(true); // Allow credentials (cookies, authorization headers)
        }
    }
