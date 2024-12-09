package org.example.esportkalendereks.dto;

public class PlayerDTO {
    private String navn;
    private String nationalitet;
    private String rank;
    private String billede;

    // Constructors
    public PlayerDTO() {}

    public PlayerDTO(String navn, String nationalitet, String rank, String billede) {
        this.navn = navn;
        this.nationalitet = nationalitet;
        this.rank = rank;
        this.billede = billede;
    }

    // Getters and Setters
    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public String getNationalitet() {
        return nationalitet;
    }

    public void setNationalitet(String nationalitet) {
        this.nationalitet = nationalitet;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getBillede() {
        return billede;
    }

    public void setBillede(String billede) {
        this.billede = billede;
    }
}
