// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './UpcomingMeeting.module.css';
import '../../../assets/css/main.css';
import 'swiper/css';
import 'swiper/css/navigation';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";

const UpcomingMeeting = () => {
    return (
        <div className={`${styles['upcomingMeeting_contents']} homepage_boxes_container d-flex flex-row flex-wrap`}>
            <header className={'w-100'}>
                <h3>جلسات پیش رو</h3>
            </header>


            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                navigation={true}
                modules={[Navigation]}
                className={'swiper_upcoming_meeting'}
            >
                <SwiperSlide>
                    <div className={`${styles['upcomingMeeting_content']}`}>
                        <div>
                            <span className={`${styles['upcomingMeeting_name']} d-block`}>علی فردوس</span>
                            <span className={`${styles['upcomingMeeting_title']} d-block`}>فیدبک ماهیانه</span>
                            <time className={`${styles['upcomingMeeting_date']} d-block`}>1402/10/23 - 10:30</time>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${styles['upcomingMeeting_content']}`}>
                        <div>
                            <span className={`${styles['upcomingMeeting_name']} d-block`}>امیر امیری</span>
                            <span className={`${styles['upcomingMeeting_title']} d-block`}>فیدبک ماهیانه</span>
                            <time className={`${styles['upcomingMeeting_date']} d-block`}>1402/10/23 - 10:30</time>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${styles['upcomingMeeting_content']}`}>
                        <div>
                            <span className={`${styles['upcomingMeeting_name']} d-block`}>رضا رضایی</span>
                            <span className={`${styles['upcomingMeeting_title']} d-block`}>فیدبک ماهیانه</span>
                            <time className={`${styles['upcomingMeeting_date']} d-block`}>1402/10/23 - 10:30</time>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${styles['upcomingMeeting_content']}`}>
                        <div>
                            <span className={`${styles['upcomingMeeting_name']} d-block`}>کریم کریمی</span>
                            <span className={`${styles['upcomingMeeting_title']} d-block`}>فیدبک ماهیانه</span>
                            <time className={`${styles['upcomingMeeting_date']} d-block`}>1402/10/23 - 10:30</time>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${styles['upcomingMeeting_content']}`}>
                        <div>
                            <span className={`${styles['upcomingMeeting_name']} d-block`}>حسین حسینی</span>
                            <span className={`${styles['upcomingMeeting_title']} d-block`}>فیدبک ماهیانه</span>
                            <time className={`${styles['upcomingMeeting_date']} d-block`}>1402/10/23 - 10:30</time>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${styles['upcomingMeeting_content']}`}>
                        <div>
                            <span className={`${styles['upcomingMeeting_name']} d-block`}>حسن حسنی</span>
                            <span className={`${styles['upcomingMeeting_title']} d-block`}>فیدبک ماهیانه</span>
                            <time className={`${styles['upcomingMeeting_date']} d-block`}>1402/10/23 - 10:30</time>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${styles['upcomingMeeting_content']}`}>
                        <div>
                            <span className={`${styles['upcomingMeeting_name']} d-block`}>کاظم کاظمی</span>
                            <span className={`${styles['upcomingMeeting_title']} d-block`}>فیدبک ماهیانه</span>
                            <time className={`${styles['upcomingMeeting_date']} d-block`}>1402/10/23 - 10:30</time>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${styles['upcomingMeeting_content']}`}>
                        <div>
                            <span className={`${styles['upcomingMeeting_name']} d-block`}>مهدی مهدوی</span>
                            <span className={`${styles['upcomingMeeting_title']} d-block`}>فیدبک ماهیانه</span>
                            <time className={`${styles['upcomingMeeting_date']} d-block`}>1402/10/23 - 10:30</time>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default UpcomingMeeting;
