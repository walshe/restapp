package com.llibaiv;

import java.util.Arrays;
import java.util.HashSet;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

import com.llibaiv.dao.CompanyDao;
import com.llibaiv.domain.Company;
import com.llibaiv.domain.Owner;

@SpringBootApplication
public class RestappApplication extends SpringBootServletInitializer{

	private static final Logger logger = LoggerFactory.getLogger(RestappApplication.class);

	
	@Autowired
	private CompanyDao companyDao;

	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(RestappApplication.class);
    }
	
	public static void main(String[] args) {
		SpringApplication.run(RestappApplication.class, args);
	}
	
	/**
	 * Sets up some sample info at startup
	 */
	@PostConstruct
	public void init() {
		createTestData();
	}
	
	private void createTestData(){
		for(int i=0;i<3;i++){
			
			Owner owner = new Owner("Bill"+i, "Gates"+i);
		
			Company company = new Company("Microsoft "+i, "One Microsoft Way", "Redmond", "USA", "info@microsoft.com",
					"(425) 703-6214"+i, new HashSet<Owner>(Arrays.asList(owner)));
			companyDao.save(company);
		}
	}
	
}
