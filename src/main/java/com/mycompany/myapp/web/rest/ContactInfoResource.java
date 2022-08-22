package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ContactInfo;
import com.mycompany.myapp.repository.ContactInfoRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.ContactInfo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ContactInfoResource {

    private final Logger log = LoggerFactory.getLogger(ContactInfoResource.class);

    private static final String ENTITY_NAME = "contactInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContactInfoRepository contactInfoRepository;

    public ContactInfoResource(ContactInfoRepository contactInfoRepository) {
        this.contactInfoRepository = contactInfoRepository;
    }

    /**
     * {@code POST  /contact-infos} : Create a new contactInfo.
     *
     * @param contactInfo the contactInfo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contactInfo, or with status {@code 400 (Bad Request)} if the contactInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contact-infos")
    public ResponseEntity<ContactInfo> createContactInfo(@RequestBody ContactInfo contactInfo) throws URISyntaxException {
        log.debug("REST request to save ContactInfo : {}", contactInfo);
        if (contactInfo.getId() != null) {
            throw new BadRequestAlertException("A new contactInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContactInfo result = contactInfoRepository.save(contactInfo);
        return ResponseEntity
            .created(new URI("/api/contact-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contact-infos/:id} : Updates an existing contactInfo.
     *
     * @param id the id of the contactInfo to save.
     * @param contactInfo the contactInfo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contactInfo,
     * or with status {@code 400 (Bad Request)} if the contactInfo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contactInfo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contact-infos/{id}")
    public ResponseEntity<ContactInfo> updateContactInfo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ContactInfo contactInfo
    ) throws URISyntaxException {
        log.debug("REST request to update ContactInfo : {}, {}", id, contactInfo);
        if (contactInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contactInfo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!contactInfoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ContactInfo result = contactInfoRepository.save(contactInfo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contactInfo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /contact-infos/:id} : Partial updates given fields of an existing contactInfo, field will ignore if it is null
     *
     * @param id the id of the contactInfo to save.
     * @param contactInfo the contactInfo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contactInfo,
     * or with status {@code 400 (Bad Request)} if the contactInfo is not valid,
     * or with status {@code 404 (Not Found)} if the contactInfo is not found,
     * or with status {@code 500 (Internal Server Error)} if the contactInfo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/contact-infos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ContactInfo> partialUpdateContactInfo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ContactInfo contactInfo
    ) throws URISyntaxException {
        log.debug("REST request to partial update ContactInfo partially : {}, {}", id, contactInfo);
        if (contactInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contactInfo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!contactInfoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ContactInfo> result = contactInfoRepository
            .findById(contactInfo.getId())
            .map(existingContactInfo -> {
                if (contactInfo.getContactType() != null) {
                    existingContactInfo.setContactType(contactInfo.getContactType());
                }
                if (contactInfo.getContactValue() != null) {
                    existingContactInfo.setContactValue(contactInfo.getContactValue());
                }

                return existingContactInfo;
            })
            .map(contactInfoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contactInfo.getId().toString())
        );
    }

    /**
     * {@code GET  /contact-infos} : get all the contactInfos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contactInfos in body.
     */
    @GetMapping("/contact-infos")
    public List<ContactInfo> getAllContactInfos() {
        log.debug("REST request to get all ContactInfos");
        return contactInfoRepository.findAll();
    }

    /**
     * {@code GET  /contact-infos/:id} : get the "id" contactInfo.
     *
     * @param id the id of the contactInfo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contactInfo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contact-infos/{id}")
    public ResponseEntity<ContactInfo> getContactInfo(@PathVariable Long id) {
        log.debug("REST request to get ContactInfo : {}", id);
        Optional<ContactInfo> contactInfo = contactInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contactInfo);
    }

    /**
     * {@code DELETE  /contact-infos/:id} : delete the "id" contactInfo.
     *
     * @param id the id of the contactInfo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contact-infos/{id}")
    public ResponseEntity<Void> deleteContactInfo(@PathVariable Long id) {
        log.debug("REST request to delete ContactInfo : {}", id);
        contactInfoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
