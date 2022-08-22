package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PersonAnnex;
import com.mycompany.myapp.repository.PersonAnnexRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.PersonAnnex}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PersonAnnexResource {

    private final Logger log = LoggerFactory.getLogger(PersonAnnexResource.class);

    private static final String ENTITY_NAME = "personAnnex";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersonAnnexRepository personAnnexRepository;

    public PersonAnnexResource(PersonAnnexRepository personAnnexRepository) {
        this.personAnnexRepository = personAnnexRepository;
    }

    /**
     * {@code POST  /person-annexes} : Create a new personAnnex.
     *
     * @param personAnnex the personAnnex to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new personAnnex, or with status {@code 400 (Bad Request)} if the personAnnex has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/person-annexes")
    public ResponseEntity<PersonAnnex> createPersonAnnex(@RequestBody PersonAnnex personAnnex) throws URISyntaxException {
        log.debug("REST request to save PersonAnnex : {}", personAnnex);
        if (personAnnex.getId() != null) {
            throw new BadRequestAlertException("A new personAnnex cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PersonAnnex result = personAnnexRepository.save(personAnnex);
        return ResponseEntity
            .created(new URI("/api/person-annexes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /person-annexes/:id} : Updates an existing personAnnex.
     *
     * @param id the id of the personAnnex to save.
     * @param personAnnex the personAnnex to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personAnnex,
     * or with status {@code 400 (Bad Request)} if the personAnnex is not valid,
     * or with status {@code 500 (Internal Server Error)} if the personAnnex couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/person-annexes/{id}")
    public ResponseEntity<PersonAnnex> updatePersonAnnex(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PersonAnnex personAnnex
    ) throws URISyntaxException {
        log.debug("REST request to update PersonAnnex : {}, {}", id, personAnnex);
        if (personAnnex.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, personAnnex.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!personAnnexRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PersonAnnex result = personAnnexRepository.save(personAnnex);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, personAnnex.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /person-annexes/:id} : Partial updates given fields of an existing personAnnex, field will ignore if it is null
     *
     * @param id the id of the personAnnex to save.
     * @param personAnnex the personAnnex to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personAnnex,
     * or with status {@code 400 (Bad Request)} if the personAnnex is not valid,
     * or with status {@code 404 (Not Found)} if the personAnnex is not found,
     * or with status {@code 500 (Internal Server Error)} if the personAnnex couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/person-annexes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PersonAnnex> partialUpdatePersonAnnex(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PersonAnnex personAnnex
    ) throws URISyntaxException {
        log.debug("REST request to partial update PersonAnnex partially : {}, {}", id, personAnnex);
        if (personAnnex.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, personAnnex.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!personAnnexRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PersonAnnex> result = personAnnexRepository
            .findById(personAnnex.getId())
            .map(existingPersonAnnex -> {
                if (personAnnex.getNid() != null) {
                    existingPersonAnnex.setNid(personAnnex.getNid());
                }
                if (personAnnex.getLegacyNid() != null) {
                    existingPersonAnnex.setLegacyNid(personAnnex.getLegacyNid());
                }
                if (personAnnex.getPassportNumber() != null) {
                    existingPersonAnnex.setPassportNumber(personAnnex.getPassportNumber());
                }
                if (personAnnex.getBirthCertificateNumber() != null) {
                    existingPersonAnnex.setBirthCertificateNumber(personAnnex.getBirthCertificateNumber());
                }
                if (personAnnex.getDrivingLicenceNumber() != null) {
                    existingPersonAnnex.setDrivingLicenceNumber(personAnnex.getDrivingLicenceNumber());
                }
                if (personAnnex.getTinCertificateNumber() != null) {
                    existingPersonAnnex.setTinCertificateNumber(personAnnex.getTinCertificateNumber());
                }
                if (personAnnex.getFacebookId() != null) {
                    existingPersonAnnex.setFacebookId(personAnnex.getFacebookId());
                }
                if (personAnnex.getTwitterId() != null) {
                    existingPersonAnnex.setTwitterId(personAnnex.getTwitterId());
                }
                if (personAnnex.getLinkedinId() != null) {
                    existingPersonAnnex.setLinkedinId(personAnnex.getLinkedinId());
                }
                if (personAnnex.getGithubId() != null) {
                    existingPersonAnnex.setGithubId(personAnnex.getGithubId());
                }
                if (personAnnex.getTiktokId() != null) {
                    existingPersonAnnex.setTiktokId(personAnnex.getTiktokId());
                }
                if (personAnnex.getInstragramId() != null) {
                    existingPersonAnnex.setInstragramId(personAnnex.getInstragramId());
                }
                if (personAnnex.getWhatsappNumber() != null) {
                    existingPersonAnnex.setWhatsappNumber(personAnnex.getWhatsappNumber());
                }
                if (personAnnex.getPinterestId() != null) {
                    existingPersonAnnex.setPinterestId(personAnnex.getPinterestId());
                }
                if (personAnnex.getTelegramId() != null) {
                    existingPersonAnnex.setTelegramId(personAnnex.getTelegramId());
                }
                if (personAnnex.getRokomariId() != null) {
                    existingPersonAnnex.setRokomariId(personAnnex.getRokomariId());
                }
                if (personAnnex.getRokomariJoinDate() != null) {
                    existingPersonAnnex.setRokomariJoinDate(personAnnex.getRokomariJoinDate());
                }
                if (personAnnex.getTechshopId() != null) {
                    existingPersonAnnex.setTechshopId(personAnnex.getTechshopId());
                }
                if (personAnnex.getTechshopJoinDate() != null) {
                    existingPersonAnnex.setTechshopJoinDate(personAnnex.getTechshopJoinDate());
                }
                if (personAnnex.getUdvashId() != null) {
                    existingPersonAnnex.setUdvashId(personAnnex.getUdvashId());
                }
                if (personAnnex.getUdvashJoinDate() != null) {
                    existingPersonAnnex.setUdvashJoinDate(personAnnex.getUdvashJoinDate());
                }
                if (personAnnex.getProhoriId() != null) {
                    existingPersonAnnex.setProhoriId(personAnnex.getProhoriId());
                }
                if (personAnnex.getProhoriJoinDate() != null) {
                    existingPersonAnnex.setProhoriJoinDate(personAnnex.getProhoriJoinDate());
                }

                return existingPersonAnnex;
            })
            .map(personAnnexRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, personAnnex.getId().toString())
        );
    }

    /**
     * {@code GET  /person-annexes} : get all the personAnnexes.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of personAnnexes in body.
     */
    @GetMapping("/person-annexes")
    public List<PersonAnnex> getAllPersonAnnexes(@RequestParam(required = false) String filter) {
        if ("person-is-null".equals(filter)) {
            log.debug("REST request to get all PersonAnnexs where person is null");
            return StreamSupport
                .stream(personAnnexRepository.findAll().spliterator(), false)
                .filter(personAnnex -> personAnnex.getPerson() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all PersonAnnexes");
        return personAnnexRepository.findAll();
    }

    /**
     * {@code GET  /person-annexes/:id} : get the "id" personAnnex.
     *
     * @param id the id of the personAnnex to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the personAnnex, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/person-annexes/{id}")
    public ResponseEntity<PersonAnnex> getPersonAnnex(@PathVariable Long id) {
        log.debug("REST request to get PersonAnnex : {}", id);
        Optional<PersonAnnex> personAnnex = personAnnexRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(personAnnex);
    }

    /**
     * {@code DELETE  /person-annexes/:id} : delete the "id" personAnnex.
     *
     * @param id the id of the personAnnex to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/person-annexes/{id}")
    public ResponseEntity<Void> deletePersonAnnex(@PathVariable Long id) {
        log.debug("REST request to delete PersonAnnex : {}", id);
        personAnnexRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
