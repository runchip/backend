package com.runchip.backend.controller;

import com.runchip.backend.model.Temperature;
import com.runchip.backend.repository.TempRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Time;

@RestController
public class SensorController {

    @Autowired
    private TempRepository tempRepository;

    @RequestMapping("/temp")
    public Iterable<Temperature> getAllTemps(Long startTime, Long endTime) {
        Iterable<Temperature> temps;
        if (startTime!=null && endTime!=null) {
            temps = tempRepository.findByTimeBetween(startTime, endTime);
        }
        else temps = tempRepository.findAll();
        return temps;
    }

    @RequestMapping(value = "/temp", method = RequestMethod.POST)
    public Temperature saveNewTemp(@RequestParam int temp) {
        Temperature temperature = new Temperature();
        Long time = System.currentTimeMillis();
        temperature.setTime(time);
        temperature.setTemp(temp);
        tempRepository.save(temperature);
        return temperature;
    }

}
