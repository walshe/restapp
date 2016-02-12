package com.llibaiv.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import com.llibaiv.domain.Owner;

@RestResource
public interface OwnerDao extends CrudRepository<Owner, Long> {

	List<Owner> findAll();

}
