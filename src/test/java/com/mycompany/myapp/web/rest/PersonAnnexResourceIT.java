package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.PersonAnnex;
import com.mycompany.myapp.repository.PersonAnnexRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PersonAnnexResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PersonAnnexResourceIT {

    private static final Long DEFAULT_NID = 1L;
    private static final Long UPDATED_NID = 2L;

    private static final Long DEFAULT_LEGACY_NID = 1L;
    private static final Long UPDATED_LEGACY_NID = 2L;

    private static final String DEFAULT_PASSPORT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PASSPORT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_BIRTH_CERTIFICATE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_BIRTH_CERTIFICATE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVING_LICENCE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_DRIVING_LICENCE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_TIN_CERTIFICATE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_TIN_CERTIFICATE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_FACEBOOK_ID = "AAAAAAAAAA";
    private static final String UPDATED_FACEBOOK_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TWITTER_ID = "AAAAAAAAAA";
    private static final String UPDATED_TWITTER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_LINKEDIN_ID = "AAAAAAAAAA";
    private static final String UPDATED_LINKEDIN_ID = "BBBBBBBBBB";

    private static final String DEFAULT_GITHUB_ID = "AAAAAAAAAA";
    private static final String UPDATED_GITHUB_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TIKTOK_ID = "AAAAAAAAAA";
    private static final String UPDATED_TIKTOK_ID = "BBBBBBBBBB";

    private static final String DEFAULT_INSTRAGRAM_ID = "AAAAAAAAAA";
    private static final String UPDATED_INSTRAGRAM_ID = "BBBBBBBBBB";

    private static final String DEFAULT_WHATSAPP_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_WHATSAPP_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PINTEREST_ID = "AAAAAAAAAA";
    private static final String UPDATED_PINTEREST_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TELEGRAM_ID = "AAAAAAAAAA";
    private static final String UPDATED_TELEGRAM_ID = "BBBBBBBBBB";

    private static final Long DEFAULT_ROKOMARI_ID = 1L;
    private static final Long UPDATED_ROKOMARI_ID = 2L;

    private static final Instant DEFAULT_ROKOMARI_JOIN_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ROKOMARI_JOIN_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_TECHSHOP_ID = 1L;
    private static final Long UPDATED_TECHSHOP_ID = 2L;

    private static final Instant DEFAULT_TECHSHOP_JOIN_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TECHSHOP_JOIN_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UDVASH_ID = "AAAAAAAAAA";
    private static final String UPDATED_UDVASH_ID = "BBBBBBBBBB";

    private static final Instant DEFAULT_UDVASH_JOIN_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UDVASH_JOIN_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_PROHORI_ID = "AAAAAAAAAA";
    private static final String UPDATED_PROHORI_ID = "BBBBBBBBBB";

    private static final Instant DEFAULT_PROHORI_JOIN_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PROHORI_JOIN_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/person-annexes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PersonAnnexRepository personAnnexRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPersonAnnexMockMvc;

    private PersonAnnex personAnnex;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonAnnex createEntity(EntityManager em) {
        PersonAnnex personAnnex = new PersonAnnex()
            .nid(DEFAULT_NID)
            .legacyNid(DEFAULT_LEGACY_NID)
            .passportNumber(DEFAULT_PASSPORT_NUMBER)
            .birthCertificateNumber(DEFAULT_BIRTH_CERTIFICATE_NUMBER)
            .drivingLicenceNumber(DEFAULT_DRIVING_LICENCE_NUMBER)
            .tinCertificateNumber(DEFAULT_TIN_CERTIFICATE_NUMBER)
            .facebookId(DEFAULT_FACEBOOK_ID)
            .twitterId(DEFAULT_TWITTER_ID)
            .linkedinId(DEFAULT_LINKEDIN_ID)
            .githubId(DEFAULT_GITHUB_ID)
            .tiktokId(DEFAULT_TIKTOK_ID)
            .instragramId(DEFAULT_INSTRAGRAM_ID)
            .whatsappNumber(DEFAULT_WHATSAPP_NUMBER)
            .pinterestId(DEFAULT_PINTEREST_ID)
            .telegramId(DEFAULT_TELEGRAM_ID)
            .rokomariId(DEFAULT_ROKOMARI_ID)
            .rokomariJoinDate(DEFAULT_ROKOMARI_JOIN_DATE)
            .techshopId(DEFAULT_TECHSHOP_ID)
            .techshopJoinDate(DEFAULT_TECHSHOP_JOIN_DATE)
            .udvashId(DEFAULT_UDVASH_ID)
            .udvashJoinDate(DEFAULT_UDVASH_JOIN_DATE)
            .prohoriId(DEFAULT_PROHORI_ID)
            .prohoriJoinDate(DEFAULT_PROHORI_JOIN_DATE);
        return personAnnex;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonAnnex createUpdatedEntity(EntityManager em) {
        PersonAnnex personAnnex = new PersonAnnex()
            .nid(UPDATED_NID)
            .legacyNid(UPDATED_LEGACY_NID)
            .passportNumber(UPDATED_PASSPORT_NUMBER)
            .birthCertificateNumber(UPDATED_BIRTH_CERTIFICATE_NUMBER)
            .drivingLicenceNumber(UPDATED_DRIVING_LICENCE_NUMBER)
            .tinCertificateNumber(UPDATED_TIN_CERTIFICATE_NUMBER)
            .facebookId(UPDATED_FACEBOOK_ID)
            .twitterId(UPDATED_TWITTER_ID)
            .linkedinId(UPDATED_LINKEDIN_ID)
            .githubId(UPDATED_GITHUB_ID)
            .tiktokId(UPDATED_TIKTOK_ID)
            .instragramId(UPDATED_INSTRAGRAM_ID)
            .whatsappNumber(UPDATED_WHATSAPP_NUMBER)
            .pinterestId(UPDATED_PINTEREST_ID)
            .telegramId(UPDATED_TELEGRAM_ID)
            .rokomariId(UPDATED_ROKOMARI_ID)
            .rokomariJoinDate(UPDATED_ROKOMARI_JOIN_DATE)
            .techshopId(UPDATED_TECHSHOP_ID)
            .techshopJoinDate(UPDATED_TECHSHOP_JOIN_DATE)
            .udvashId(UPDATED_UDVASH_ID)
            .udvashJoinDate(UPDATED_UDVASH_JOIN_DATE)
            .prohoriId(UPDATED_PROHORI_ID)
            .prohoriJoinDate(UPDATED_PROHORI_JOIN_DATE);
        return personAnnex;
    }

    @BeforeEach
    public void initTest() {
        personAnnex = createEntity(em);
    }

    @Test
    @Transactional
    void createPersonAnnex() throws Exception {
        int databaseSizeBeforeCreate = personAnnexRepository.findAll().size();
        // Create the PersonAnnex
        restPersonAnnexMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personAnnex)))
            .andExpect(status().isCreated());

        // Validate the PersonAnnex in the database
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeCreate + 1);
        PersonAnnex testPersonAnnex = personAnnexList.get(personAnnexList.size() - 1);
        assertThat(testPersonAnnex.getNid()).isEqualTo(DEFAULT_NID);
        assertThat(testPersonAnnex.getLegacyNid()).isEqualTo(DEFAULT_LEGACY_NID);
        assertThat(testPersonAnnex.getPassportNumber()).isEqualTo(DEFAULT_PASSPORT_NUMBER);
        assertThat(testPersonAnnex.getBirthCertificateNumber()).isEqualTo(DEFAULT_BIRTH_CERTIFICATE_NUMBER);
        assertThat(testPersonAnnex.getDrivingLicenceNumber()).isEqualTo(DEFAULT_DRIVING_LICENCE_NUMBER);
        assertThat(testPersonAnnex.getTinCertificateNumber()).isEqualTo(DEFAULT_TIN_CERTIFICATE_NUMBER);
        assertThat(testPersonAnnex.getFacebookId()).isEqualTo(DEFAULT_FACEBOOK_ID);
        assertThat(testPersonAnnex.getTwitterId()).isEqualTo(DEFAULT_TWITTER_ID);
        assertThat(testPersonAnnex.getLinkedinId()).isEqualTo(DEFAULT_LINKEDIN_ID);
        assertThat(testPersonAnnex.getGithubId()).isEqualTo(DEFAULT_GITHUB_ID);
        assertThat(testPersonAnnex.getTiktokId()).isEqualTo(DEFAULT_TIKTOK_ID);
        assertThat(testPersonAnnex.getInstragramId()).isEqualTo(DEFAULT_INSTRAGRAM_ID);
        assertThat(testPersonAnnex.getWhatsappNumber()).isEqualTo(DEFAULT_WHATSAPP_NUMBER);
        assertThat(testPersonAnnex.getPinterestId()).isEqualTo(DEFAULT_PINTEREST_ID);
        assertThat(testPersonAnnex.getTelegramId()).isEqualTo(DEFAULT_TELEGRAM_ID);
        assertThat(testPersonAnnex.getRokomariId()).isEqualTo(DEFAULT_ROKOMARI_ID);
        assertThat(testPersonAnnex.getRokomariJoinDate()).isEqualTo(DEFAULT_ROKOMARI_JOIN_DATE);
        assertThat(testPersonAnnex.getTechshopId()).isEqualTo(DEFAULT_TECHSHOP_ID);
        assertThat(testPersonAnnex.getTechshopJoinDate()).isEqualTo(DEFAULT_TECHSHOP_JOIN_DATE);
        assertThat(testPersonAnnex.getUdvashId()).isEqualTo(DEFAULT_UDVASH_ID);
        assertThat(testPersonAnnex.getUdvashJoinDate()).isEqualTo(DEFAULT_UDVASH_JOIN_DATE);
        assertThat(testPersonAnnex.getProhoriId()).isEqualTo(DEFAULT_PROHORI_ID);
        assertThat(testPersonAnnex.getProhoriJoinDate()).isEqualTo(DEFAULT_PROHORI_JOIN_DATE);
    }

    @Test
    @Transactional
    void createPersonAnnexWithExistingId() throws Exception {
        // Create the PersonAnnex with an existing ID
        personAnnex.setId(1L);

        int databaseSizeBeforeCreate = personAnnexRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonAnnexMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personAnnex)))
            .andExpect(status().isBadRequest());

        // Validate the PersonAnnex in the database
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPersonAnnexes() throws Exception {
        // Initialize the database
        personAnnexRepository.saveAndFlush(personAnnex);

        // Get all the personAnnexList
        restPersonAnnexMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personAnnex.getId().intValue())))
            .andExpect(jsonPath("$.[*].nid").value(hasItem(DEFAULT_NID.intValue())))
            .andExpect(jsonPath("$.[*].legacyNid").value(hasItem(DEFAULT_LEGACY_NID.intValue())))
            .andExpect(jsonPath("$.[*].passportNumber").value(hasItem(DEFAULT_PASSPORT_NUMBER)))
            .andExpect(jsonPath("$.[*].birthCertificateNumber").value(hasItem(DEFAULT_BIRTH_CERTIFICATE_NUMBER)))
            .andExpect(jsonPath("$.[*].drivingLicenceNumber").value(hasItem(DEFAULT_DRIVING_LICENCE_NUMBER)))
            .andExpect(jsonPath("$.[*].tinCertificateNumber").value(hasItem(DEFAULT_TIN_CERTIFICATE_NUMBER)))
            .andExpect(jsonPath("$.[*].facebookId").value(hasItem(DEFAULT_FACEBOOK_ID)))
            .andExpect(jsonPath("$.[*].twitterId").value(hasItem(DEFAULT_TWITTER_ID)))
            .andExpect(jsonPath("$.[*].linkedinId").value(hasItem(DEFAULT_LINKEDIN_ID)))
            .andExpect(jsonPath("$.[*].githubId").value(hasItem(DEFAULT_GITHUB_ID)))
            .andExpect(jsonPath("$.[*].tiktokId").value(hasItem(DEFAULT_TIKTOK_ID)))
            .andExpect(jsonPath("$.[*].instragramId").value(hasItem(DEFAULT_INSTRAGRAM_ID)))
            .andExpect(jsonPath("$.[*].whatsappNumber").value(hasItem(DEFAULT_WHATSAPP_NUMBER)))
            .andExpect(jsonPath("$.[*].pinterestId").value(hasItem(DEFAULT_PINTEREST_ID)))
            .andExpect(jsonPath("$.[*].telegramId").value(hasItem(DEFAULT_TELEGRAM_ID)))
            .andExpect(jsonPath("$.[*].rokomariId").value(hasItem(DEFAULT_ROKOMARI_ID.intValue())))
            .andExpect(jsonPath("$.[*].rokomariJoinDate").value(hasItem(DEFAULT_ROKOMARI_JOIN_DATE.toString())))
            .andExpect(jsonPath("$.[*].techshopId").value(hasItem(DEFAULT_TECHSHOP_ID.intValue())))
            .andExpect(jsonPath("$.[*].techshopJoinDate").value(hasItem(DEFAULT_TECHSHOP_JOIN_DATE.toString())))
            .andExpect(jsonPath("$.[*].udvashId").value(hasItem(DEFAULT_UDVASH_ID)))
            .andExpect(jsonPath("$.[*].udvashJoinDate").value(hasItem(DEFAULT_UDVASH_JOIN_DATE.toString())))
            .andExpect(jsonPath("$.[*].prohoriId").value(hasItem(DEFAULT_PROHORI_ID)))
            .andExpect(jsonPath("$.[*].prohoriJoinDate").value(hasItem(DEFAULT_PROHORI_JOIN_DATE.toString())));
    }

    @Test
    @Transactional
    void getPersonAnnex() throws Exception {
        // Initialize the database
        personAnnexRepository.saveAndFlush(personAnnex);

        // Get the personAnnex
        restPersonAnnexMockMvc
            .perform(get(ENTITY_API_URL_ID, personAnnex.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(personAnnex.getId().intValue()))
            .andExpect(jsonPath("$.nid").value(DEFAULT_NID.intValue()))
            .andExpect(jsonPath("$.legacyNid").value(DEFAULT_LEGACY_NID.intValue()))
            .andExpect(jsonPath("$.passportNumber").value(DEFAULT_PASSPORT_NUMBER))
            .andExpect(jsonPath("$.birthCertificateNumber").value(DEFAULT_BIRTH_CERTIFICATE_NUMBER))
            .andExpect(jsonPath("$.drivingLicenceNumber").value(DEFAULT_DRIVING_LICENCE_NUMBER))
            .andExpect(jsonPath("$.tinCertificateNumber").value(DEFAULT_TIN_CERTIFICATE_NUMBER))
            .andExpect(jsonPath("$.facebookId").value(DEFAULT_FACEBOOK_ID))
            .andExpect(jsonPath("$.twitterId").value(DEFAULT_TWITTER_ID))
            .andExpect(jsonPath("$.linkedinId").value(DEFAULT_LINKEDIN_ID))
            .andExpect(jsonPath("$.githubId").value(DEFAULT_GITHUB_ID))
            .andExpect(jsonPath("$.tiktokId").value(DEFAULT_TIKTOK_ID))
            .andExpect(jsonPath("$.instragramId").value(DEFAULT_INSTRAGRAM_ID))
            .andExpect(jsonPath("$.whatsappNumber").value(DEFAULT_WHATSAPP_NUMBER))
            .andExpect(jsonPath("$.pinterestId").value(DEFAULT_PINTEREST_ID))
            .andExpect(jsonPath("$.telegramId").value(DEFAULT_TELEGRAM_ID))
            .andExpect(jsonPath("$.rokomariId").value(DEFAULT_ROKOMARI_ID.intValue()))
            .andExpect(jsonPath("$.rokomariJoinDate").value(DEFAULT_ROKOMARI_JOIN_DATE.toString()))
            .andExpect(jsonPath("$.techshopId").value(DEFAULT_TECHSHOP_ID.intValue()))
            .andExpect(jsonPath("$.techshopJoinDate").value(DEFAULT_TECHSHOP_JOIN_DATE.toString()))
            .andExpect(jsonPath("$.udvashId").value(DEFAULT_UDVASH_ID))
            .andExpect(jsonPath("$.udvashJoinDate").value(DEFAULT_UDVASH_JOIN_DATE.toString()))
            .andExpect(jsonPath("$.prohoriId").value(DEFAULT_PROHORI_ID))
            .andExpect(jsonPath("$.prohoriJoinDate").value(DEFAULT_PROHORI_JOIN_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingPersonAnnex() throws Exception {
        // Get the personAnnex
        restPersonAnnexMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPersonAnnex() throws Exception {
        // Initialize the database
        personAnnexRepository.saveAndFlush(personAnnex);

        int databaseSizeBeforeUpdate = personAnnexRepository.findAll().size();

        // Update the personAnnex
        PersonAnnex updatedPersonAnnex = personAnnexRepository.findById(personAnnex.getId()).get();
        // Disconnect from session so that the updates on updatedPersonAnnex are not directly saved in db
        em.detach(updatedPersonAnnex);
        updatedPersonAnnex
            .nid(UPDATED_NID)
            .legacyNid(UPDATED_LEGACY_NID)
            .passportNumber(UPDATED_PASSPORT_NUMBER)
            .birthCertificateNumber(UPDATED_BIRTH_CERTIFICATE_NUMBER)
            .drivingLicenceNumber(UPDATED_DRIVING_LICENCE_NUMBER)
            .tinCertificateNumber(UPDATED_TIN_CERTIFICATE_NUMBER)
            .facebookId(UPDATED_FACEBOOK_ID)
            .twitterId(UPDATED_TWITTER_ID)
            .linkedinId(UPDATED_LINKEDIN_ID)
            .githubId(UPDATED_GITHUB_ID)
            .tiktokId(UPDATED_TIKTOK_ID)
            .instragramId(UPDATED_INSTRAGRAM_ID)
            .whatsappNumber(UPDATED_WHATSAPP_NUMBER)
            .pinterestId(UPDATED_PINTEREST_ID)
            .telegramId(UPDATED_TELEGRAM_ID)
            .rokomariId(UPDATED_ROKOMARI_ID)
            .rokomariJoinDate(UPDATED_ROKOMARI_JOIN_DATE)
            .techshopId(UPDATED_TECHSHOP_ID)
            .techshopJoinDate(UPDATED_TECHSHOP_JOIN_DATE)
            .udvashId(UPDATED_UDVASH_ID)
            .udvashJoinDate(UPDATED_UDVASH_JOIN_DATE)
            .prohoriId(UPDATED_PROHORI_ID)
            .prohoriJoinDate(UPDATED_PROHORI_JOIN_DATE);

        restPersonAnnexMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPersonAnnex.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPersonAnnex))
            )
            .andExpect(status().isOk());

        // Validate the PersonAnnex in the database
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeUpdate);
        PersonAnnex testPersonAnnex = personAnnexList.get(personAnnexList.size() - 1);
        assertThat(testPersonAnnex.getNid()).isEqualTo(UPDATED_NID);
        assertThat(testPersonAnnex.getLegacyNid()).isEqualTo(UPDATED_LEGACY_NID);
        assertThat(testPersonAnnex.getPassportNumber()).isEqualTo(UPDATED_PASSPORT_NUMBER);
        assertThat(testPersonAnnex.getBirthCertificateNumber()).isEqualTo(UPDATED_BIRTH_CERTIFICATE_NUMBER);
        assertThat(testPersonAnnex.getDrivingLicenceNumber()).isEqualTo(UPDATED_DRIVING_LICENCE_NUMBER);
        assertThat(testPersonAnnex.getTinCertificateNumber()).isEqualTo(UPDATED_TIN_CERTIFICATE_NUMBER);
        assertThat(testPersonAnnex.getFacebookId()).isEqualTo(UPDATED_FACEBOOK_ID);
        assertThat(testPersonAnnex.getTwitterId()).isEqualTo(UPDATED_TWITTER_ID);
        assertThat(testPersonAnnex.getLinkedinId()).isEqualTo(UPDATED_LINKEDIN_ID);
        assertThat(testPersonAnnex.getGithubId()).isEqualTo(UPDATED_GITHUB_ID);
        assertThat(testPersonAnnex.getTiktokId()).isEqualTo(UPDATED_TIKTOK_ID);
        assertThat(testPersonAnnex.getInstragramId()).isEqualTo(UPDATED_INSTRAGRAM_ID);
        assertThat(testPersonAnnex.getWhatsappNumber()).isEqualTo(UPDATED_WHATSAPP_NUMBER);
        assertThat(testPersonAnnex.getPinterestId()).isEqualTo(UPDATED_PINTEREST_ID);
        assertThat(testPersonAnnex.getTelegramId()).isEqualTo(UPDATED_TELEGRAM_ID);
        assertThat(testPersonAnnex.getRokomariId()).isEqualTo(UPDATED_ROKOMARI_ID);
        assertThat(testPersonAnnex.getRokomariJoinDate()).isEqualTo(UPDATED_ROKOMARI_JOIN_DATE);
        assertThat(testPersonAnnex.getTechshopId()).isEqualTo(UPDATED_TECHSHOP_ID);
        assertThat(testPersonAnnex.getTechshopJoinDate()).isEqualTo(UPDATED_TECHSHOP_JOIN_DATE);
        assertThat(testPersonAnnex.getUdvashId()).isEqualTo(UPDATED_UDVASH_ID);
        assertThat(testPersonAnnex.getUdvashJoinDate()).isEqualTo(UPDATED_UDVASH_JOIN_DATE);
        assertThat(testPersonAnnex.getProhoriId()).isEqualTo(UPDATED_PROHORI_ID);
        assertThat(testPersonAnnex.getProhoriJoinDate()).isEqualTo(UPDATED_PROHORI_JOIN_DATE);
    }

    @Test
    @Transactional
    void putNonExistingPersonAnnex() throws Exception {
        int databaseSizeBeforeUpdate = personAnnexRepository.findAll().size();
        personAnnex.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonAnnexMockMvc
            .perform(
                put(ENTITY_API_URL_ID, personAnnex.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personAnnex))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonAnnex in the database
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPersonAnnex() throws Exception {
        int databaseSizeBeforeUpdate = personAnnexRepository.findAll().size();
        personAnnex.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonAnnexMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personAnnex))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonAnnex in the database
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPersonAnnex() throws Exception {
        int databaseSizeBeforeUpdate = personAnnexRepository.findAll().size();
        personAnnex.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonAnnexMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personAnnex)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PersonAnnex in the database
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePersonAnnexWithPatch() throws Exception {
        // Initialize the database
        personAnnexRepository.saveAndFlush(personAnnex);

        int databaseSizeBeforeUpdate = personAnnexRepository.findAll().size();

        // Update the personAnnex using partial update
        PersonAnnex partialUpdatedPersonAnnex = new PersonAnnex();
        partialUpdatedPersonAnnex.setId(personAnnex.getId());

        partialUpdatedPersonAnnex
            .nid(UPDATED_NID)
            .legacyNid(UPDATED_LEGACY_NID)
            .passportNumber(UPDATED_PASSPORT_NUMBER)
            .facebookId(UPDATED_FACEBOOK_ID)
            .twitterId(UPDATED_TWITTER_ID)
            .tiktokId(UPDATED_TIKTOK_ID)
            .whatsappNumber(UPDATED_WHATSAPP_NUMBER)
            .techshopId(UPDATED_TECHSHOP_ID)
            .udvashId(UPDATED_UDVASH_ID)
            .prohoriId(UPDATED_PROHORI_ID);

        restPersonAnnexMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPersonAnnex.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPersonAnnex))
            )
            .andExpect(status().isOk());

        // Validate the PersonAnnex in the database
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeUpdate);
        PersonAnnex testPersonAnnex = personAnnexList.get(personAnnexList.size() - 1);
        assertThat(testPersonAnnex.getNid()).isEqualTo(UPDATED_NID);
        assertThat(testPersonAnnex.getLegacyNid()).isEqualTo(UPDATED_LEGACY_NID);
        assertThat(testPersonAnnex.getPassportNumber()).isEqualTo(UPDATED_PASSPORT_NUMBER);
        assertThat(testPersonAnnex.getBirthCertificateNumber()).isEqualTo(DEFAULT_BIRTH_CERTIFICATE_NUMBER);
        assertThat(testPersonAnnex.getDrivingLicenceNumber()).isEqualTo(DEFAULT_DRIVING_LICENCE_NUMBER);
        assertThat(testPersonAnnex.getTinCertificateNumber()).isEqualTo(DEFAULT_TIN_CERTIFICATE_NUMBER);
        assertThat(testPersonAnnex.getFacebookId()).isEqualTo(UPDATED_FACEBOOK_ID);
        assertThat(testPersonAnnex.getTwitterId()).isEqualTo(UPDATED_TWITTER_ID);
        assertThat(testPersonAnnex.getLinkedinId()).isEqualTo(DEFAULT_LINKEDIN_ID);
        assertThat(testPersonAnnex.getGithubId()).isEqualTo(DEFAULT_GITHUB_ID);
        assertThat(testPersonAnnex.getTiktokId()).isEqualTo(UPDATED_TIKTOK_ID);
        assertThat(testPersonAnnex.getInstragramId()).isEqualTo(DEFAULT_INSTRAGRAM_ID);
        assertThat(testPersonAnnex.getWhatsappNumber()).isEqualTo(UPDATED_WHATSAPP_NUMBER);
        assertThat(testPersonAnnex.getPinterestId()).isEqualTo(DEFAULT_PINTEREST_ID);
        assertThat(testPersonAnnex.getTelegramId()).isEqualTo(DEFAULT_TELEGRAM_ID);
        assertThat(testPersonAnnex.getRokomariId()).isEqualTo(DEFAULT_ROKOMARI_ID);
        assertThat(testPersonAnnex.getRokomariJoinDate()).isEqualTo(DEFAULT_ROKOMARI_JOIN_DATE);
        assertThat(testPersonAnnex.getTechshopId()).isEqualTo(UPDATED_TECHSHOP_ID);
        assertThat(testPersonAnnex.getTechshopJoinDate()).isEqualTo(DEFAULT_TECHSHOP_JOIN_DATE);
        assertThat(testPersonAnnex.getUdvashId()).isEqualTo(UPDATED_UDVASH_ID);
        assertThat(testPersonAnnex.getUdvashJoinDate()).isEqualTo(DEFAULT_UDVASH_JOIN_DATE);
        assertThat(testPersonAnnex.getProhoriId()).isEqualTo(UPDATED_PROHORI_ID);
        assertThat(testPersonAnnex.getProhoriJoinDate()).isEqualTo(DEFAULT_PROHORI_JOIN_DATE);
    }

    @Test
    @Transactional
    void fullUpdatePersonAnnexWithPatch() throws Exception {
        // Initialize the database
        personAnnexRepository.saveAndFlush(personAnnex);

        int databaseSizeBeforeUpdate = personAnnexRepository.findAll().size();

        // Update the personAnnex using partial update
        PersonAnnex partialUpdatedPersonAnnex = new PersonAnnex();
        partialUpdatedPersonAnnex.setId(personAnnex.getId());

        partialUpdatedPersonAnnex
            .nid(UPDATED_NID)
            .legacyNid(UPDATED_LEGACY_NID)
            .passportNumber(UPDATED_PASSPORT_NUMBER)
            .birthCertificateNumber(UPDATED_BIRTH_CERTIFICATE_NUMBER)
            .drivingLicenceNumber(UPDATED_DRIVING_LICENCE_NUMBER)
            .tinCertificateNumber(UPDATED_TIN_CERTIFICATE_NUMBER)
            .facebookId(UPDATED_FACEBOOK_ID)
            .twitterId(UPDATED_TWITTER_ID)
            .linkedinId(UPDATED_LINKEDIN_ID)
            .githubId(UPDATED_GITHUB_ID)
            .tiktokId(UPDATED_TIKTOK_ID)
            .instragramId(UPDATED_INSTRAGRAM_ID)
            .whatsappNumber(UPDATED_WHATSAPP_NUMBER)
            .pinterestId(UPDATED_PINTEREST_ID)
            .telegramId(UPDATED_TELEGRAM_ID)
            .rokomariId(UPDATED_ROKOMARI_ID)
            .rokomariJoinDate(UPDATED_ROKOMARI_JOIN_DATE)
            .techshopId(UPDATED_TECHSHOP_ID)
            .techshopJoinDate(UPDATED_TECHSHOP_JOIN_DATE)
            .udvashId(UPDATED_UDVASH_ID)
            .udvashJoinDate(UPDATED_UDVASH_JOIN_DATE)
            .prohoriId(UPDATED_PROHORI_ID)
            .prohoriJoinDate(UPDATED_PROHORI_JOIN_DATE);

        restPersonAnnexMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPersonAnnex.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPersonAnnex))
            )
            .andExpect(status().isOk());

        // Validate the PersonAnnex in the database
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeUpdate);
        PersonAnnex testPersonAnnex = personAnnexList.get(personAnnexList.size() - 1);
        assertThat(testPersonAnnex.getNid()).isEqualTo(UPDATED_NID);
        assertThat(testPersonAnnex.getLegacyNid()).isEqualTo(UPDATED_LEGACY_NID);
        assertThat(testPersonAnnex.getPassportNumber()).isEqualTo(UPDATED_PASSPORT_NUMBER);
        assertThat(testPersonAnnex.getBirthCertificateNumber()).isEqualTo(UPDATED_BIRTH_CERTIFICATE_NUMBER);
        assertThat(testPersonAnnex.getDrivingLicenceNumber()).isEqualTo(UPDATED_DRIVING_LICENCE_NUMBER);
        assertThat(testPersonAnnex.getTinCertificateNumber()).isEqualTo(UPDATED_TIN_CERTIFICATE_NUMBER);
        assertThat(testPersonAnnex.getFacebookId()).isEqualTo(UPDATED_FACEBOOK_ID);
        assertThat(testPersonAnnex.getTwitterId()).isEqualTo(UPDATED_TWITTER_ID);
        assertThat(testPersonAnnex.getLinkedinId()).isEqualTo(UPDATED_LINKEDIN_ID);
        assertThat(testPersonAnnex.getGithubId()).isEqualTo(UPDATED_GITHUB_ID);
        assertThat(testPersonAnnex.getTiktokId()).isEqualTo(UPDATED_TIKTOK_ID);
        assertThat(testPersonAnnex.getInstragramId()).isEqualTo(UPDATED_INSTRAGRAM_ID);
        assertThat(testPersonAnnex.getWhatsappNumber()).isEqualTo(UPDATED_WHATSAPP_NUMBER);
        assertThat(testPersonAnnex.getPinterestId()).isEqualTo(UPDATED_PINTEREST_ID);
        assertThat(testPersonAnnex.getTelegramId()).isEqualTo(UPDATED_TELEGRAM_ID);
        assertThat(testPersonAnnex.getRokomariId()).isEqualTo(UPDATED_ROKOMARI_ID);
        assertThat(testPersonAnnex.getRokomariJoinDate()).isEqualTo(UPDATED_ROKOMARI_JOIN_DATE);
        assertThat(testPersonAnnex.getTechshopId()).isEqualTo(UPDATED_TECHSHOP_ID);
        assertThat(testPersonAnnex.getTechshopJoinDate()).isEqualTo(UPDATED_TECHSHOP_JOIN_DATE);
        assertThat(testPersonAnnex.getUdvashId()).isEqualTo(UPDATED_UDVASH_ID);
        assertThat(testPersonAnnex.getUdvashJoinDate()).isEqualTo(UPDATED_UDVASH_JOIN_DATE);
        assertThat(testPersonAnnex.getProhoriId()).isEqualTo(UPDATED_PROHORI_ID);
        assertThat(testPersonAnnex.getProhoriJoinDate()).isEqualTo(UPDATED_PROHORI_JOIN_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingPersonAnnex() throws Exception {
        int databaseSizeBeforeUpdate = personAnnexRepository.findAll().size();
        personAnnex.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonAnnexMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, personAnnex.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(personAnnex))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonAnnex in the database
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPersonAnnex() throws Exception {
        int databaseSizeBeforeUpdate = personAnnexRepository.findAll().size();
        personAnnex.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonAnnexMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(personAnnex))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonAnnex in the database
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPersonAnnex() throws Exception {
        int databaseSizeBeforeUpdate = personAnnexRepository.findAll().size();
        personAnnex.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonAnnexMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(personAnnex))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PersonAnnex in the database
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePersonAnnex() throws Exception {
        // Initialize the database
        personAnnexRepository.saveAndFlush(personAnnex);

        int databaseSizeBeforeDelete = personAnnexRepository.findAll().size();

        // Delete the personAnnex
        restPersonAnnexMockMvc
            .perform(delete(ENTITY_API_URL_ID, personAnnex.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PersonAnnex> personAnnexList = personAnnexRepository.findAll();
        assertThat(personAnnexList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
