import React, { useContext, useState, useEffect } from 'react';
import './styles.css';
import { themeContext } from '../../App';

const AboutUs = () => {
    const theme = useContext(themeContext);

    const enthusiastWords = ['энтузиастов', 'визионеров', 'мечтателей', 'инженеров'];
    const locationWords = [
        "России", "Австралии", "Австрии", "Азербайджане", "Албании", "Алжире", "Анголе", "Андорре", 
        "Антигуа и Барбуде","Аргентине", "Армении", "Афганистане", "Багамах", "Бангладеше", "Барбадосе", 
        "Бахрейне", "Беларуси","Белизе", "Бельгии", "Бенине", "Бутане", "Боливии", "Боснии и Герцеговине", "Ботсване", 
        "Бразилии","Брунее", "Болгарии", "Буркина-Фасо", "Бурунди", "Вануату", "Ватикане", "Великобритании", "Венгрии",
        "Венесуэле", "Восточном Тиморе", "Вьетнаме", "Габоне", "Гаити", "Гайане", "Гамбии", "Гане", "Гватемале",
        "Гвинее", "Гвинее-Бисау", "Германии", "Гондурасе", "Гренаде", "Греции", "Грузии", "Дании", "Джибути",
        "Доминике", "Доминикане", "Египте", "Замбии", "Зимбабве", "Израиле", "Индии", "Индонезии", "Иордании",
        "Ираке", "Иране", "Ирландии", "Исландии", "Испании", "Италии", "Йемене", "Кабо-Верде", "Казахстане",
        "Камбодже", "Камеруне", "Канаде", "Катаре", "Кении", "Кипре", "Киргизии", "Кирибати", "Китае",
        "Колумбии", "Коморах", "Конго", "Коста-Рике", "Кот-д'Ивуаре", "Кубе", "Кувейте", "Лаосе", "Латвии",
        "Лесото", "Либерии", "Ливане", "Ливии", "Литве", "Лихтенштейне", "Люксембурге", "Маврикии", "Мавритании",
        "Мадагаскаре", "Малави", "Малайзии", "Мали", "Мальдивах", "Мальте", "Марокко", "Маршалловых Островах",
        "Мексике", "Мозамбике", "Молдове", "Монако", "Монголии", "Мьянме", "Намибии", "Науру", "Непале",
        "Нигере", "Нигерии", "Нидерландах", "Никарагуа", "Новой Зеландии", "Норвегии", "ОАЭ", "Омане",
        "Пакистане", "Палау", "Панаме", "Папуа-Новой Гвинее", "Парагвае", "Перу", "Польше", "Португалии",
        "Руанде", "Румынии", "Сальвадоре", "Самоа", "Сан-Марино", "Саудовской Аравии", "Сенегале",
        "Сент-Китсе и Невисе", "Сент-Люсии", "Сербии", "Сейшельских Островах", "Сингапуре", "Сирии", "Словакии",
        "Словении", "Соломоновых Островах", "Сомали", "Суданe", "Суринаме", "США", "Сьерра-Леоне", "Таджикистане",
        "Таиланде", "Танзании", "Того", "Тонга", "Тринидаде и Тобаго", "Тунисе", "Туркменистане", "Турции",
        "Уганде", "Узбекистане", "Украине", "Уругвае", "Фиджи", "Филиппинах", "Финляндии", "Франции", "Хорватии",
        "Центральноафриканской Республике", "Чаде", "Черногории", "Чехии", "Чили", "Швейцарии", "Швеции", "Шри-Ланке",
        "Эквадоре", "Экваториальной Гвинее", "Эритрее", "Эстонии", "Эфиопии", "ЮАР", "Южной Корее", "Южном Судане",
        "Ямайке", "Японии"
    ];
    
    const scientistWords = ['учеными', 'астрономами', 'геологами', 'инженерами'];

    const [enthusiastIndex, setEnthusiastIndex] = useState(0);
    const [locationIndex, setLocationIndex] = useState(0);
    const [scientistIndex, setScientistIndex] = useState(0);

    const startCycling = (setIndex, arrayLength) => {
        return setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % arrayLength);
        }, 600);
    };

    const handleMouseEnter = (setIndex, arrayLength, setIntervalId) => {
        const intervalId = startCycling(setIndex, arrayLength);
        setIntervalId(intervalId);
    };

    const handleMouseLeave = (intervalId, setIntervalId) => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    const [enthusiastIntervalId, setEnthusiastIntervalId] = useState(null);
    const [locationIntervalId, setLocationIntervalId] = useState(null);
    const [scientistIntervalId, setScientistIntervalId] = useState(null);

    return (
        <div id='AboutUs' style={{ color: theme.palette.text.primary }}>
            <div id="welcomeAU">
                <h1>
                    Добро пожаловать на сайт Baobab&nbsp;Media&nbsp;Inc., лидера в космических доставках! Мы предлагаем уникальные товары - астероиды, доставленные прямо из космоса к вам домой.
                    Все началось в 2024 году, когда группа <span 
                        className='changingWord'
                        onMouseEnter={() => handleMouseEnter(setEnthusiastIndex, enthusiastWords.length, setEnthusiastIntervalId)}
                        onMouseLeave={() => handleMouseLeave(enthusiastIntervalId, setEnthusiastIntervalId)}
                    >
                        {enthusiastWords[enthusiastIndex]}
                    </span> решила сделать космос доступным каждому. Так появилась идея Baobab&nbsp;Media&nbsp;Inc.
                    Сейчас мы работаем в <span 
                        className='changingWord'
                        onMouseEnter={() => handleMouseEnter(setLocationIndex, locationWords.length, setLocationIntervalId)}
                        onMouseLeave={() => handleMouseLeave(locationIntervalId, setLocationIntervalId)}
                    >
                        {locationWords[locationIndex]}
                    </span> и обеспечиваем быструю доставку астероидов по всему миру. Наши офисы в крупнейших космопортах и сотрудничество с космическими агентствами гарантируют качество и безопасность.
                    Выбирая Baobab&nbsp;Media&nbsp;Inc., вы выбираете инновации и качество. Каждый астероид проходит строгий отбор и проверку <span 
                        className='changingWord'
                        onMouseEnter={() => handleMouseEnter(setScientistIndex, scientistWords.length, setScientistIntervalId)}
                        onMouseLeave={() => handleMouseLeave(scientistIntervalId, setScientistIntervalId)}
                    >
                        {scientistWords[scientistIndex]}
                    </span>, чтобы гарантировать лучший продукт.
                    <br />
                    Закажите астероид на www.asteroid.shop и ощутите космос у себя дома.
                </h1>
            </div>
        </div>
    );
};

export default AboutUs;
