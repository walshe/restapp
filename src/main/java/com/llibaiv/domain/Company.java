package com.llibaiv.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity
public class Company implements Serializable {

	@Id
	@GeneratedValue
	private Long id;

	@NotNull
	private String name;

	@NotNull
	private String address;

	@NotNull
	private String city;

	@NotNull
	private String country;

	private String email;

	private String phoneNumber;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "company")
	private Set<Owner> owners = new HashSet<>();

	public Company() {
		super();
	}

	public Company(String name, String address, String city, String country, String email, String phoneNumber,
			Set<Owner> owners) {
		super();
		this.name = name;
		this.address = address;
		this.city = city;
		this.country = country;
		this.email = email;
		this.phoneNumber = phoneNumber;
		owners.forEach(owner -> {
			owner.setCompany(this);
			this.owners.add(owner);
		});
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Set<Owner> getOwners() {
		return owners;
	}

	public void setOwners(Set<Owner> owners) {
		this.owners = owners;
	}

}
