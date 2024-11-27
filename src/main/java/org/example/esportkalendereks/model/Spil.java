package org.example.esportkalendereks.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Spil {

    @Id
    int id;
    String navn;
    String kategori;
}
