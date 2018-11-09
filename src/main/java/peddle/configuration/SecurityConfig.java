package peddle.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import peddle.security.CustomUserDetailsService;
import peddle.security.JwtAuthenticationEntryPoint;
import peddle.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private CustomUserDetailsService customUserDetailsService;

  private JwtAuthenticationEntryPoint unauthorizedHandler;

  @Autowired
  public SecurityConfig(CustomUserDetailsService customUserDetailsService,
                        JwtAuthenticationEntryPoint unauthorizedHandler) {
    this.customUserDetailsService = customUserDetailsService;
    this.unauthorizedHandler = unauthorizedHandler;
  }

  @Bean
  public FilterRegistrationBean corsFilter() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.addAllowedOrigin("*");
    config.addAllowedHeader("*");
    config.addAllowedMethod("*");
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
    bean.setOrder(0);
    return bean;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public JwtAuthenticationFilter jwtAuthenticationFilter() {
    return new JwtAuthenticationFilter();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .headers()
        .frameOptions()
        .disable()
        .and()

        .csrf()
        .disable()

        .exceptionHandling()
        .authenticationEntryPoint(unauthorizedHandler)
        .and()

        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()

        .authorizeRequests()
        .antMatchers("/h2/**", "/h2-console/**",
            "/", "/static/**", "*.png",
            "*.html","/favicon.ico","/img/**",
            "/manifest.json",
            "/events", "/event/**", "/cart", "/login","/profile/**", "/register", "/registration/**",
            "/changePass/**","/registration", "/changePass",
            "/api/login", "/api/register", "/api/remind/**", "/api/register/**",
            "/api/city/**", "/api/categories/**", "/api/events/**", "/api/languages/**",
            "/api/transfer/**", "/api/accommodations/**")
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()

        .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
  }

  @Override
  public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
    authenticationManagerBuilder
        .userDetailsService(customUserDetailsService)
        .passwordEncoder(passwordEncoder());
  }

  @Bean(BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}
