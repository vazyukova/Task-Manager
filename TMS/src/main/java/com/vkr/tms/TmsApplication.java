package com.vkr.tms;

import com.vkr.tms.controllers.UserController;
import com.vkr.tms.model.Usr;
import com.vkr.tms.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication()
@ComponentScan(value = "com")
public class TmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(TmsApplication.class, args);
    }
}
/*
* Что нужно сделать
* 1. Вывод деталей проекта
* --Удаление участника
* 2.1 Драг энд дроп?
* 5. Редактирование задачи
* 7. Редактирование в системной админке
* 8. Изменение пароля
* 9. Отправка пароля на почту
* 12. УВЕДОМЛЕНИЯ!
* 13. Валидация на формах
* 15.Поиск по задачам
* -App Bar
* -Flat List
* */
