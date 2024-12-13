package org.example.esportkalendereks;

import org.example.esportkalendereks.model.Hold;
import org.example.esportkalendereks.repository.HoldRepository;
import org.example.esportkalendereks.service.HoldService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class) // Brug den nyeste version af Mockito
public class HoldServiceTest {

    @Mock
    private HoldRepository holdRepository;

    @InjectMocks
    private HoldService holdService;

    private Hold hold;

    @BeforeEach
    void setUp() {
        hold = new Hold();
        hold.setNavn("Team A");
        hold.setRank("Gold");
        hold.setNationalitet("Denmark");
        hold.setAntal(5);
        hold.setResume("A competitive team");
        hold.setSpil("League of Legends");
    }

    @Test
    void testSaveHold() {
        when(holdRepository.save(hold)).thenReturn(hold);

        holdService.saveHold(hold);

        verify(holdRepository, times(1)).save(hold);
        assertNotNull(hold.getHoldID(), "Hold ID should not be null after save");
        assertEquals("Team A", hold.getNavn(), "The team name should be 'Team A'");
        assertEquals("Gold", hold.getRank(), "The rank should be 'Gold'");
    }

    @Test
    void testFindById() {
        when(holdRepository.findById(1)).thenReturn(java.util.Optional.of(hold));

        Hold foundHold = holdService.findById(1);

        assertNotNull(foundHold, "Hold should be found");
        assertEquals(0, foundHold.getHoldID(), "The hold ID should be 1");
        assertEquals("Team A", foundHold.getNavn(), "The team name should be 'Team A'");
    }
}
