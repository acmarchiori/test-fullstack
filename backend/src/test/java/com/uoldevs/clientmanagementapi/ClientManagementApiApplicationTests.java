package com.uoldevs.clientmanagementapi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

@SpringBootTest
public class ClientManagementApiApplicationTests {

	@MockBean
	private SpringApplication springApplication;

	@Autowired
	private ApplicationContext applicationContext;

	@Test
	public void contextoDaAplicacaoCarregaComSucesso() {
		assert(applicationContext != null);
	}
}
