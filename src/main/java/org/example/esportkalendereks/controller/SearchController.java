package org.example.esportkalendereks.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> search(@RequestParam String query) {
        String sql = "SELECT 'Hold' AS type, navn FROM hold WHERE navn LIKE :query " +
                "UNION " +
                "SELECT 'Spiller' AS type, navn FROM spiller WHERE navn LIKE :query " +
                "UNION " +
                "SELECT 'Spiller' AS type, email AS navn FROM spiller WHERE email LIKE :query";

        Map<String, String> params = Map.of("query", "%" + query + "%");

        List<Map<String, Object>> results = namedParameterJdbcTemplate.queryForList(sql, params);

        return ResponseEntity.ok(results);
    }
}
