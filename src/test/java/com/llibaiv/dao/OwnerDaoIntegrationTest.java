package com.llibaiv.dao;

import static org.hamcrest.Matchers.emptyIterable;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.junit.Assert.assertThat;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.llibaiv.AbstractIntegrationTest;
import com.llibaiv.domain.Owner;

public class OwnerDaoIntegrationTest extends AbstractIntegrationTest {

	@Autowired
	OwnerDao repository;

	@Test
	public void findsAllOwners() {

		Iterable<Owner> owners = repository.findAll();
		assertThat(owners, is(not(emptyIterable())));
	}

	@Test
	public void createsNewOwner() {

		Long before = repository.count();

		Owner owner = repository.save(createOwner());

		Iterable<Owner> result = repository.findAll();
		assertThat(result, is(Matchers.<Owner> iterableWithSize(before.intValue() + 1)));
		assertThat(result, hasItem(owner));
	}

	
	@Test
	public void updateOwner() {

		Owner owner = repository.save(createOwner());

		owner.setFirstName("changedFirstName");

		repository.save(owner);

		assertThat("changedFirstName", is(repository.findOne(owner.getId()).getFirstName()));

	}
	

	@Test
	public void deleteCompany() {

		Owner owner = repository.save(createOwner());

		assertThat(owner, is(repository.findOne(owner.getId())));

		repository.delete(owner);

		assertThat(null, is(repository.findOne(owner.getId())));

	}

	public static Owner createOwner() {
		Owner owner = new Owner();
		owner.setFirstName("firstName");
		owner.setLastName("lastName");
		return owner;
	}
}
