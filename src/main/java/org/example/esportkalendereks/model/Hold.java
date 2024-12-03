package org.example.esportkalendereks.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hold {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long holdID; // Brug Long frem for int for bedre skalerbarhed

    private String navn;
    private String rank;
    private String nationalitet;
    private int antal;

    // Relation til Coach
    @OneToOne
    @JoinColumn(name = "coach_id")
    private Coach coach;

    // Relation til Begivenheder
    @OneToMany(mappedBy = "hold", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude // Forhindrer cyklisk reference
    @EqualsAndHashCode.Exclude
    private List<Begivenheder> begivenheder;
}
