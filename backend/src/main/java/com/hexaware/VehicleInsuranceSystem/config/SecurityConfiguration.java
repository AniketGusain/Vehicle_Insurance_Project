package com.hexaware.VehicleInsuranceSystem.config;


import com.hexaware.VehicleInsuranceSystem.services.UserService;
import com.hexaware.VehicleInsuranceSystem.utils.RSAKeyProperties;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.IOException;

@Configuration
@EnableWebMvc
public class SecurityConfiguration {

    @Autowired
    UserService userService;
    private final RSAKeyProperties keys;


    public SecurityConfiguration(RSAKeyProperties keys){
        this.keys = keys;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService){
        DaoAuthenticationProvider daoAuthenticationProviderProvider = new DaoAuthenticationProvider();
        daoAuthenticationProviderProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProviderProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(daoAuthenticationProviderProvider);
    }

    @Bean
    public DefaultSecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/demo/**").permitAll();
                    auth.requestMatchers("/api/v1/policies/all").permitAll();
                    auth.requestMatchers("/api/v1/proposals/all").hasRole("ADMIN");
                    auth.requestMatchers("/api/v1/auth/**").permitAll();
                    auth.requestMatchers("/api/v1/policies/create").hasRole("ADMIN");
                    auth.requestMatchers("/api/v1/proposals/create").hasRole("USER");
                    auth.requestMatchers("/api/v1/users/**").hasRole("USER");
                    auth.requestMatchers("/api/v1/proposals/status/**").hasRole("ADMIN");
                    auth.requestMatchers("/api/v1/products/{productId}").permitAll();
                    auth.requestMatchers("/api/v1/products/add").hasRole("ADMIN");
                    auth.requestMatchers("/api/v1/cart/**").permitAll();
                    auth.requestMatchers("/api/v1/payments/**").permitAll();
                    auth.requestMatchers("/api/v1/orders/**").permitAll();
                    auth.requestMatchers("/oauth/**").permitAll();
                    auth.anyRequest().authenticated();
                })
//                .oauth2Login(oauth2 -> oauth2
//                        .loginPage("/demo")

//                        .userInfoEndpoint(userInfo -> userInfo.userService(oauthUserService))
//                        .successHandler(new AuthenticationSuccessHandler() {
//
//                            @Autowired
//                            private JwtDecoder jwtDecoder;
//                            @Override
//                            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//                                Object principal = authentication.getPrincipal();
//
////                                if (principal instanceof CustomOAuth2User) {
////
////                                    CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();
////                                    Map<String, Object> attributes = oauthUser.getAttributes();
////                                    String idToken = (String) attributes.get("id_token");
////
////                                    // Decode the JWT token using JwtDecoder
////                                    Jwt jwt = jwtDecoder.decode(idToken);
////
////                                    String accessTokenHash = jwt.getClaimAsString("at_hash");
////                                    System.out.println(accessTokenHash);
//
////                                    userService.processOAuthPostLogin(oauthUser.getEmail());
////                                    response.sendRedirect("http://localhost:4200/dash");
////                                }
//                            }
//                        })
//                        .failureHandler(new SimpleUrlAuthenticationFailureHandler("/demo?error"))
//                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
                )
                .sessionManagement(
                        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );
        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder(){
        return NimbusJwtDecoder.withPublicKey(keys.getPublicKey()).build();
    }

    @Bean
    public JwtEncoder jwtEncoder(){
        JWK jwk = new RSAKey.Builder(keys.getPublicKey()).privateKey(keys.getPrivateKey()).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter(){
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtConverter;
    }
}
