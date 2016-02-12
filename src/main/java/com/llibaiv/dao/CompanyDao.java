package com.llibaiv.dao;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import com.llibaiv.domain.Company;

@RestResource
public interface CompanyDao extends PagingAndSortingRepository<Company, Long> {


}

