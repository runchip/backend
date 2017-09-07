package com.runchip.backend.repository;

import com.runchip.backend.model.Temperature;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TempRepository extends CrudRepository<Temperature, Long> {

    List<Temperature> findByTimeBetween(Long startTime, Long endTime);
}
