import React from 'react';
import './styles.css';

const AboutUs = () => {
    return (
        <div id="AboutUs">
            <h1>О нас</h1>
            <div className="about-content">
                <p>Добро пожаловать в наш интернет-магазин! Мы рады предложить вам широкий ассортимент товаров и услуг.</p>
                <p>Наша компания была основана в 2023 году с целью предоставить нашим клиентам лучшие товары по конкурентоспособным ценам. Мы верим в качество и удовлетворение потребностей наших клиентов, поэтому все наши продукты тщательно отбираются и проверяются.</p>
                <p>Мы гордимся нашей командой профессионалов, которые всегда готовы помочь вам с любыми вопросами и предложениями. Наша миссия – сделать ваш опыт покупок максимально приятным и удобным.</p>
                <p>Спасибо, что выбрали нас!</p>
            </div>
            <div className="team-section">
                <h2>Наша команда</h2>
                <div className="team-members">
                    <div className="team-member">
                        <img src="https://avatars.mds.yandex.net/get-ydo/472106/2a0000016b884fe37a98b33d7602e041cbce/320x320" alt="Team Member" />
                        <h3>Иван Иванов</h3>
                        <p>Генеральный директор</p>
                    </div>
                    <div className="team-member">
                        <img src="https://media.springernature.com/lw400/springer-cms/rest/v1/img/10282328/v3/16by9?as=jpg" alt="Team Member" />
                        <h3>Анна Смирнова</h3>
                        <p>Менеджер по продажам</p>
                    </div>
                    <div className="team-member">
                        <img src="https://gfx.dlastudenta.pl/fotoalbum/03b/2ce/b73/723/933085" alt="Team Member" />
                        <h3>Петр Петров</h3>
                        <p>Главный инженер</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
