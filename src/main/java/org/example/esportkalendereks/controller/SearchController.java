package org.example.esportkalendereks.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
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
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> search(@RequestParam String query) {
        String sql = "SELECT 'Hold' AS type, navn FROM hold WHERE navn LIKE ? " +
                "UNION " +
                "SELECT 'Spiller' AS type, navn FROM spiller WHERE navn LIKE ?";
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql, "%" + query + "%", "%" + query + "%");

        return ResponseEntity.ok(results);
    }
}

