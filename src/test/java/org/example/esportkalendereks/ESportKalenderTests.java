package org.example.esportkalendereks;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class ESportKalenderTests {

    @Test
    void contextLoads() {
    }

    @Test
    void simpleTest() {
        int result = add(2, 3);
        assertTrue(result == 5, "Addition test failed");
    }

    // En simpel metode, som vi tester
    private int add(int a, int b) {
        return a + b;
    }
}
