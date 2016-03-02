package com.llibaiv.dao;

import static org.hamcrest.Matchers.emptyIterable;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.junit.Assert.assertThat;

import java.util.HashSet;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.llibaiv.AbstractIntegrationTest;
import com.llibaiv.domain.Company;

public class CompanyDaoIntegrationTest extends AbstractIntegrationTest {

	@Autowired
	CompanyDao repository;

	@Test
	public void findsAllOrders() {

		Iterable<Company> companies = repository.findAll();
		assertThat(companies, is(not(emptyIterable())));
	}

	@Test
	public void createsNewCompany() {

		Long before = repository.count();

		Company company = repository.save(createCompany());

		Iterable<Company> result = repository.findAll();
		assertThat(result, is(Matchers.<Company> iterableWithSize(before.intValue() + 1)));
		assertThat(result, hasItem(company));
	}
	
	//@Test
	public void createsNewCompanyValidation() {

		Long before = repository.count();

		Company company = createCompany();
		company.setName(null);
		repository.save(company);
		
		Iterable<Company> result = repository.findAll();
		assertThat(result, is(Matchers.<Company> iterableWithSize(before.intValue() + 1)));
		assertThat(result, hasItem(company));
	}

	@Test
	public void updateCompany() {

		Company company = repository.save(createCompany());

		company.setName("changedName");

		repository.save(company);

		assertThat("changedName", is(repository.findOne(company.getId()).getName()));

	}

	@Test
	public void deleteCompany() {

		Company company = repository.save(createCompany());

		assertThat(company, is(repository.findOne(company.getId())));

		repository.delete(company);

		assertThat(null, is(repository.findOne(company.getId())));

	}

	public static Company createCompany() {
		Company company = new Company("testName", "testAddress", "testCity", "testCountry", "testEmail",
				"testPhoneNumber", new HashSet<>());
		return company;
	}
}
