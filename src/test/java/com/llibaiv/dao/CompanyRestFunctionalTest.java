package com.llibaiv.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.client.RestTemplate;

import com.llibaiv.RestappApplication;
import com.llibaiv.domain.Company;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = RestappApplication.class)
@WebIntegrationTest(randomPort = true)
public class CompanyRestFunctionalTest {

	private RestTemplate restTemplate;

	@Value("${local.server.port}")
	private int port;
	
	@Autowired
	CompanyDao companyDao;
	
	@Before
	public void setUp() throws Exception {
		restTemplate = new RestTemplate();
	}

	@Test
	public void getCompany() throws Exception {

		ResponseEntity<Resource<Company>> responseEntity = restTemplate.exchange(
				"http://localhost:{port}/api/companies/1", HttpMethod.GET, null,
				new ParameterizedTypeReference<Resource<Company>>() {
				}, port);

		if (responseEntity.getStatusCode() == HttpStatus.OK) {
			Resource<Company> companyResource = responseEntity.getBody();
			Company company = companyResource.getContent();
			
			assertEquals("Microsoft 0", company.getName());
			
			//TODO the company object has no owners in its collection, how can I test this
			
			
		}else{
			fail();
		}


	}

	@Test
	public void getCompanies() throws Exception {

		ResponseEntity<Resource<List<Company>>> responseEntity = restTemplate.exchange(
				"http://localhost:{port}/api/companies/", HttpMethod.GET, null,
				new ParameterizedTypeReference<Resource<List<Company>>>() {
				}, port);

		if (responseEntity.getStatusCode() == HttpStatus.OK) {
			
			responseEntity.getBody();
			
			//TODO getting empty body here

		}

	}

}
