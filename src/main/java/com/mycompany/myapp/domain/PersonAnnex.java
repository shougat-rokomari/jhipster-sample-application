package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PersonAnnex.
 */
@Entity
@Table(name = "person_annex")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PersonAnnex implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nid")
    private Long nid;

    @Column(name = "legacy_nid")
    private Long legacyNid;

    @Column(name = "passport_number")
    private String passportNumber;

    @Column(name = "birth_certificate_number")
    private String birthCertificateNumber;

    @Column(name = "driving_licence_number")
    private String drivingLicenceNumber;

    @Column(name = "tin_certificate_number")
    private String tinCertificateNumber;

    @Column(name = "facebook_id")
    private String facebookId;

    @Column(name = "twitter_id")
    private String twitterId;

    @Column(name = "linkedin_id")
    private String linkedinId;

    @Column(name = "github_id")
    private String githubId;

    @Column(name = "tiktok_id")
    private String tiktokId;

    @Column(name = "instragram_id")
    private String instragramId;

    @Column(name = "whatsapp_number")
    private String whatsappNumber;

    @Column(name = "pinterest_id")
    private String pinterestId;

    @Column(name = "telegram_id")
    private String telegramId;

    @Column(name = "rokomari_id")
    private Long rokomariId;

    @Column(name = "rokomari_join_date")
    private Instant rokomariJoinDate;

    @Column(name = "techshop_id")
    private Long techshopId;

    @Column(name = "techshop_join_date")
    private Instant techshopJoinDate;

    @Column(name = "udvash_id")
    private String udvashId;

    @Column(name = "udvash_join_date")
    private Instant udvashJoinDate;

    @Column(name = "prohori_id")
    private String prohoriId;

    @Column(name = "prohori_join_date")
    private Instant prohoriJoinDate;

    @JsonIgnoreProperties(value = { "personAnnex", "contactInfos" }, allowSetters = true)
    @OneToOne(mappedBy = "personAnnex")
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PersonAnnex id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNid() {
        return this.nid;
    }

    public PersonAnnex nid(Long nid) {
        this.setNid(nid);
        return this;
    }

    public void setNid(Long nid) {
        this.nid = nid;
    }

    public Long getLegacyNid() {
        return this.legacyNid;
    }

    public PersonAnnex legacyNid(Long legacyNid) {
        this.setLegacyNid(legacyNid);
        return this;
    }

    public void setLegacyNid(Long legacyNid) {
        this.legacyNid = legacyNid;
    }

    public String getPassportNumber() {
        return this.passportNumber;
    }

    public PersonAnnex passportNumber(String passportNumber) {
        this.setPassportNumber(passportNumber);
        return this;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public String getBirthCertificateNumber() {
        return this.birthCertificateNumber;
    }

    public PersonAnnex birthCertificateNumber(String birthCertificateNumber) {
        this.setBirthCertificateNumber(birthCertificateNumber);
        return this;
    }

    public void setBirthCertificateNumber(String birthCertificateNumber) {
        this.birthCertificateNumber = birthCertificateNumber;
    }

    public String getDrivingLicenceNumber() {
        return this.drivingLicenceNumber;
    }

    public PersonAnnex drivingLicenceNumber(String drivingLicenceNumber) {
        this.setDrivingLicenceNumber(drivingLicenceNumber);
        return this;
    }

    public void setDrivingLicenceNumber(String drivingLicenceNumber) {
        this.drivingLicenceNumber = drivingLicenceNumber;
    }

    public String getTinCertificateNumber() {
        return this.tinCertificateNumber;
    }

    public PersonAnnex tinCertificateNumber(String tinCertificateNumber) {
        this.setTinCertificateNumber(tinCertificateNumber);
        return this;
    }

    public void setTinCertificateNumber(String tinCertificateNumber) {
        this.tinCertificateNumber = tinCertificateNumber;
    }

    public String getFacebookId() {
        return this.facebookId;
    }

    public PersonAnnex facebookId(String facebookId) {
        this.setFacebookId(facebookId);
        return this;
    }

    public void setFacebookId(String facebookId) {
        this.facebookId = facebookId;
    }

    public String getTwitterId() {
        return this.twitterId;
    }

    public PersonAnnex twitterId(String twitterId) {
        this.setTwitterId(twitterId);
        return this;
    }

    public void setTwitterId(String twitterId) {
        this.twitterId = twitterId;
    }

    public String getLinkedinId() {
        return this.linkedinId;
    }

    public PersonAnnex linkedinId(String linkedinId) {
        this.setLinkedinId(linkedinId);
        return this;
    }

    public void setLinkedinId(String linkedinId) {
        this.linkedinId = linkedinId;
    }

    public String getGithubId() {
        return this.githubId;
    }

    public PersonAnnex githubId(String githubId) {
        this.setGithubId(githubId);
        return this;
    }

    public void setGithubId(String githubId) {
        this.githubId = githubId;
    }

    public String getTiktokId() {
        return this.tiktokId;
    }

    public PersonAnnex tiktokId(String tiktokId) {
        this.setTiktokId(tiktokId);
        return this;
    }

    public void setTiktokId(String tiktokId) {
        this.tiktokId = tiktokId;
    }

    public String getInstragramId() {
        return this.instragramId;
    }

    public PersonAnnex instragramId(String instragramId) {
        this.setInstragramId(instragramId);
        return this;
    }

    public void setInstragramId(String instragramId) {
        this.instragramId = instragramId;
    }

    public String getWhatsappNumber() {
        return this.whatsappNumber;
    }

    public PersonAnnex whatsappNumber(String whatsappNumber) {
        this.setWhatsappNumber(whatsappNumber);
        return this;
    }

    public void setWhatsappNumber(String whatsappNumber) {
        this.whatsappNumber = whatsappNumber;
    }

    public String getPinterestId() {
        return this.pinterestId;
    }

    public PersonAnnex pinterestId(String pinterestId) {
        this.setPinterestId(pinterestId);
        return this;
    }

    public void setPinterestId(String pinterestId) {
        this.pinterestId = pinterestId;
    }

    public String getTelegramId() {
        return this.telegramId;
    }

    public PersonAnnex telegramId(String telegramId) {
        this.setTelegramId(telegramId);
        return this;
    }

    public void setTelegramId(String telegramId) {
        this.telegramId = telegramId;
    }

    public Long getRokomariId() {
        return this.rokomariId;
    }

    public PersonAnnex rokomariId(Long rokomariId) {
        this.setRokomariId(rokomariId);
        return this;
    }

    public void setRokomariId(Long rokomariId) {
        this.rokomariId = rokomariId;
    }

    public Instant getRokomariJoinDate() {
        return this.rokomariJoinDate;
    }

    public PersonAnnex rokomariJoinDate(Instant rokomariJoinDate) {
        this.setRokomariJoinDate(rokomariJoinDate);
        return this;
    }

    public void setRokomariJoinDate(Instant rokomariJoinDate) {
        this.rokomariJoinDate = rokomariJoinDate;
    }

    public Long getTechshopId() {
        return this.techshopId;
    }

    public PersonAnnex techshopId(Long techshopId) {
        this.setTechshopId(techshopId);
        return this;
    }

    public void setTechshopId(Long techshopId) {
        this.techshopId = techshopId;
    }

    public Instant getTechshopJoinDate() {
        return this.techshopJoinDate;
    }

    public PersonAnnex techshopJoinDate(Instant techshopJoinDate) {
        this.setTechshopJoinDate(techshopJoinDate);
        return this;
    }

    public void setTechshopJoinDate(Instant techshopJoinDate) {
        this.techshopJoinDate = techshopJoinDate;
    }

    public String getUdvashId() {
        return this.udvashId;
    }

    public PersonAnnex udvashId(String udvashId) {
        this.setUdvashId(udvashId);
        return this;
    }

    public void setUdvashId(String udvashId) {
        this.udvashId = udvashId;
    }

    public Instant getUdvashJoinDate() {
        return this.udvashJoinDate;
    }

    public PersonAnnex udvashJoinDate(Instant udvashJoinDate) {
        this.setUdvashJoinDate(udvashJoinDate);
        return this;
    }

    public void setUdvashJoinDate(Instant udvashJoinDate) {
        this.udvashJoinDate = udvashJoinDate;
    }

    public String getProhoriId() {
        return this.prohoriId;
    }

    public PersonAnnex prohoriId(String prohoriId) {
        this.setProhoriId(prohoriId);
        return this;
    }

    public void setProhoriId(String prohoriId) {
        this.prohoriId = prohoriId;
    }

    public Instant getProhoriJoinDate() {
        return this.prohoriJoinDate;
    }

    public PersonAnnex prohoriJoinDate(Instant prohoriJoinDate) {
        this.setProhoriJoinDate(prohoriJoinDate);
        return this;
    }

    public void setProhoriJoinDate(Instant prohoriJoinDate) {
        this.prohoriJoinDate = prohoriJoinDate;
    }

    public Person getPerson() {
        return this.person;
    }

    public void setPerson(Person person) {
        if (this.person != null) {
            this.person.setPersonAnnex(null);
        }
        if (person != null) {
            person.setPersonAnnex(this);
        }
        this.person = person;
    }

    public PersonAnnex person(Person person) {
        this.setPerson(person);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PersonAnnex)) {
            return false;
        }
        return id != null && id.equals(((PersonAnnex) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PersonAnnex{" +
            "id=" + getId() +
            ", nid=" + getNid() +
            ", legacyNid=" + getLegacyNid() +
            ", passportNumber='" + getPassportNumber() + "'" +
            ", birthCertificateNumber='" + getBirthCertificateNumber() + "'" +
            ", drivingLicenceNumber='" + getDrivingLicenceNumber() + "'" +
            ", tinCertificateNumber='" + getTinCertificateNumber() + "'" +
            ", facebookId='" + getFacebookId() + "'" +
            ", twitterId='" + getTwitterId() + "'" +
            ", linkedinId='" + getLinkedinId() + "'" +
            ", githubId='" + getGithubId() + "'" +
            ", tiktokId='" + getTiktokId() + "'" +
            ", instragramId='" + getInstragramId() + "'" +
            ", whatsappNumber='" + getWhatsappNumber() + "'" +
            ", pinterestId='" + getPinterestId() + "'" +
            ", telegramId='" + getTelegramId() + "'" +
            ", rokomariId=" + getRokomariId() +
            ", rokomariJoinDate='" + getRokomariJoinDate() + "'" +
            ", techshopId=" + getTechshopId() +
            ", techshopJoinDate='" + getTechshopJoinDate() + "'" +
            ", udvashId='" + getUdvashId() + "'" +
            ", udvashJoinDate='" + getUdvashJoinDate() + "'" +
            ", prohoriId='" + getProhoriId() + "'" +
            ", prohoriJoinDate='" + getProhoriJoinDate() + "'" +
            "}";
    }
}
