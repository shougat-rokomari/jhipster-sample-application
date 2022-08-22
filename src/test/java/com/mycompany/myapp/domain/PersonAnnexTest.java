package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PersonAnnexTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonAnnex.class);
        PersonAnnex personAnnex1 = new PersonAnnex();
        personAnnex1.setId(1L);
        PersonAnnex personAnnex2 = new PersonAnnex();
        personAnnex2.setId(personAnnex1.getId());
        assertThat(personAnnex1).isEqualTo(personAnnex2);
        personAnnex2.setId(2L);
        assertThat(personAnnex1).isNotEqualTo(personAnnex2);
        personAnnex1.setId(null);
        assertThat(personAnnex1).isNotEqualTo(personAnnex2);
    }
}
