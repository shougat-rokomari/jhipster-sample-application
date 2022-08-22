package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.Gender;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "date_of_birth")
    private Instant dateOfBirth;

    @Column(name = "date_of_death")
    private Instant dateOfDeath;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @JsonIgnoreProperties(value = { "person" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private PersonAnnex personAnnex;

    @OneToMany(mappedBy = "person")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "person" }, allowSetters = true)
    private Set<ContactInfo> contactInfos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Person id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Person name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getDateOfBirth() {
        return this.dateOfBirth;
    }

    public Person dateOfBirth(Instant dateOfBirth) {
        this.setDateOfBirth(dateOfBirth);
        return this;
    }

    public void setDateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Instant getDateOfDeath() {
        return this.dateOfDeath;
    }

    public Person dateOfDeath(Instant dateOfDeath) {
        this.setDateOfDeath(dateOfDeath);
        return this;
    }

    public void setDateOfDeath(Instant dateOfDeath) {
        this.dateOfDeath = dateOfDeath;
    }

    public Gender getGender() {
        return this.gender;
    }

    public Person gender(Gender gender) {
        this.setGender(gender);
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public PersonAnnex getPersonAnnex() {
        return this.personAnnex;
    }

    public void setPersonAnnex(PersonAnnex personAnnex) {
        this.personAnnex = personAnnex;
    }

    public Person personAnnex(PersonAnnex personAnnex) {
        this.setPersonAnnex(personAnnex);
        return this;
    }

    public Set<ContactInfo> getContactInfos() {
        return this.contactInfos;
    }

    public void setContactInfos(Set<ContactInfo> contactInfos) {
        if (this.contactInfos != null) {
            this.contactInfos.forEach(i -> i.setPerson(null));
        }
        if (contactInfos != null) {
            contactInfos.forEach(i -> i.setPerson(this));
        }
        this.contactInfos = contactInfos;
    }

    public Person contactInfos(Set<ContactInfo> contactInfos) {
        this.setContactInfos(contactInfos);
        return this;
    }

    public Person addContactInfos(ContactInfo contactInfo) {
        this.contactInfos.add(contactInfo);
        contactInfo.setPerson(this);
        return this;
    }

    public Person removeContactInfos(ContactInfo contactInfo) {
        this.contactInfos.remove(contactInfo);
        contactInfo.setPerson(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Person)) {
            return false;
        }
        return id != null && id.equals(((Person) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", dateOfDeath='" + getDateOfDeath() + "'" +
            ", gender='" + getGender() + "'" +
            "}";
    }
}
