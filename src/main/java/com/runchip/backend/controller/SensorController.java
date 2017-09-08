package com.runchip.backend.controller;

import com.runchip.backend.model.Temperature;
import com.runchip.backend.repository.TempRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class SensorController {

    @Autowired
    private TempRepository tempRepository;

    @RequestMapping("/temp")
    public Iterable<Temperature> getAllTemps(@RequestParam(required = false) Long startTime, @RequestParam(required = false) Long endTime) {
        Iterable<Temperature> temps;
        if (startTime!=null && endTime!=null) {
            temps = tempRepository.findByTimeBetween(startTime, endTime);
        }
        else temps = tempRepository.findAll();
        return temps;
    }

    /*@RequestMapping("/temp")
    public Iterable<Temperature> getAllTemps(@RequestParam(required = false) String startTime, @RequestParam(required = false) String endTime) throws Exception{
        Iterable<Temperature> temps;
        if (!startTime.isEmpty() && !endTime.isEmpty()) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");
            Date startDate = sdf.parse(startTime);
            Date endDate = sdf.parse(endTime);
            temps = tempRepository.findByTimeBetween(startDate.getTime(), endDate.getTime());
        }
        else temps = tempRepository.findAll();
        return temps;
    }*/

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
