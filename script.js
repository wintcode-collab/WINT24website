// 스크롤 위치 복원 방지
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// 모바일 네비게이션 토글
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // 햄버거 아이콘 애니메이션
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// 메뉴 링크 클릭 시 메뉴 닫기
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // 네비게이션 높이 고려
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 스크롤 시 네비게이션 표시/숨김 (모든 해상도에서 작동)
(function() {
    let navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // 네비게이션 바 업데이트 함수
    function updateNavbar() {
        if (!navbar) {
            navbar = document.querySelector('.navbar');
            if (!navbar) return;
        }
        
        // 스크롤 위치 계산 (모든 방법 시도)
        let scroll = 0;
        scroll = document.documentElement.scrollTop || window.pageYOffset || window.scrollY || 0;
        scroll = Math.round(Math.max(0, scroll));
        
        // 스크롤이 1px 이상이면 표시, 그 이하면 숨김
        // 네비게이션 바는 body 밖에 있어서 body scale의 영향을 받지 않음
        if (scroll > 1) {
            navbar.classList.add('visible');
            navbar.style.transform = 'translateY(0)';
        } else {
            navbar.classList.remove('visible');
            navbar.style.transform = 'translateY(-100%)';
        }
    }
    
    // 즉시 실행
    updateNavbar();
    
    // 스크롤 이벤트 (throttle 적용)
    let ticking = false;
    function throttledUpdateNavbar() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', throttledUpdateNavbar, { passive: true });
    document.addEventListener('scroll', throttledUpdateNavbar, { passive: true });
    
    // 리사이즈 시 업데이트
    window.addEventListener('resize', throttledUpdateNavbar);
})();

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션을 적용할 요소들 (DOMContentLoaded 후 실행)
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.service-card, .step, .portfolio-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}


// 폼 제출 처리
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };
        
        // 버튼 상태 변경
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = '전송 중...';
        submitButton.disabled = true;
        
        // 실제 환경에서는 여기서 서버로 데이터를 전송합니다
        // 예: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
        
        // 시뮬레이션: 성공 메시지 표시
        setTimeout(() => {
            alert('문의가 성공적으로 전송되었습니다!\n빠른 시일 내에 연락드리겠습니다.');
            
            // 폼 초기화
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    });
}

// 숫자 카운터 애니메이션 (포트폴리오가 많을 때 사용)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// 전체 사이트 스케일링 함수 (전체화면 1920x1080 기준)
function scaleSite() {
    const baseWidth = 1920;
    const baseHeight = 1080;
    
    // 전체화면 모드 감지
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    
    // 전체화면 모드와 일반 모드 모두에서 동일하게 window.innerWidth/Height 사용
    // 전체화면 모드에서도 실제 렌더링되는 뷰포트 크기를 기준으로 계산
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    
    // 1920x1080 기준으로 최대 1로 제한 (전체화면 확대 방지)
    // 가로와 세로 중 작은 비율을 사용하되, 최대 1로 제한
    const scaleX = currentWidth / baseWidth;
    const scaleY = currentHeight / baseHeight;
    // 가로와 세로 중 작은 값 사용, 최대 1로 제한하여 전체화면에서도 확대되지 않도록
    const scale = Math.min(Math.min(scaleX, scaleY), 1);
    
    // 양쪽 여백을 없애기 위해 body의 실제 너비를 조정
    // 1920px보다 큰 화면에서는 body width를 늘려서 여백 없이 채움
    const actualBodyWidth = currentWidth > baseWidth ? currentWidth : baseWidth;
    
    // 네비게이션 바를 body의 transform 영향에서 완전히 제외 (먼저 이동)
    // body에 transform이 있으면 fixed 요소도 영향을 받으므로, 네비게이션 바를 body 밖으로 이동
    const navbar = document.querySelector('.navbar');
    if (navbar && navbar.parentElement === document.body) {
        // 네비게이션 바를 body에서 제거하고 html에 직접 추가 (body transform 영향 없음)
        document.documentElement.insertBefore(navbar, document.body);
    }
    
    
    // 네비게이션 바 텍스트 위치는 CSS의 vw 단위로 고정되어 있으므로
    // JavaScript에서 재계산할 필요 없음 (전체화면 전환 시에도 위치 고정)
    
    // scale 적용 (중앙 정렬을 위해 transform-origin 변경)
    if (currentWidth > baseWidth) {
        // 1920px보다 큰 화면: scale 없이 body width를 늘려서 채움
        document.body.style.transform = 'none';
        document.body.style.transformOrigin = 'top left';
        document.body.style.width = '100%';
        document.body.style.height = 'auto';
        document.body.style.position = 'relative';
        document.body.style.top = '0';
        document.body.style.left = '0';
        document.body.style.marginTop = '0';
        document.body.style.marginLeft = '0';
    } else {
        // 1920px보다 작은 화면: scale로 축소
        document.body.style.transform = `scale(${scale})`;
        document.body.style.transformOrigin = 'top center';
        document.body.style.width = `${baseWidth}px`;
        document.body.style.height = 'auto';
        document.body.style.position = 'relative';
        document.body.style.top = '0';
        document.body.style.left = '50%';
        document.body.style.marginTop = '0';
        document.body.style.marginLeft = `${-baseWidth / 2}px`;
        document.body.style.marginBottom = '0';
        
        // scale 적용 후 실제 높이 계산하여 html 높이 조정 (footer 밑 여백 제거)
        setTimeout(() => {
            const bodyRect = document.body.getBoundingClientRect();
            const actualBodyHeight = bodyRect.height;
            // html 높이를 body의 실제 렌더링 높이에 맞춤
            document.documentElement.style.height = `${actualBodyHeight}px`;
            document.documentElement.style.minHeight = `${actualBodyHeight}px`;
        }, 10);
    }
    // footer 밑 여백 제거를 위해 body margin-bottom 명시
    document.body.style.marginBottom = '0';
    document.body.style.overflowX = 'hidden';
    
    // 전체화면 여부와 관계없이 중앙 정렬 유지
    // 배경색 설정 (전체화면 여부와 상관없이 동일)
    document.documentElement.style.backgroundColor = '#101010';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = 'auto';
    // body는 스크롤 없도록 설정 (html에만 스크롤)
    document.body.style.overflow = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden';
    
    // 스케일 적용 완료 표시
    document.body.classList.add('scale-applied');
    
    // 동영상과 반사 비디오 위치 재조정
    // fixVideoPosition 함수가 정의되어 있는지 확인 후 호출
    if (typeof window.fixVideoPosition === 'function') {
        setTimeout(() => {
            window.fixVideoPosition();
        }, 10);
    }
    
}

// DOM 로드 시 즉시 스케일 적용 (초기 렌더링 시 위치 변경 방지)
// 스크립트가 head에 있으면 DOMContentLoaded 전에도 실행 가능하도록 즉시 실행 함수 사용
(function() {
    function applyScaling() {
        window.scrollTo(0, 0);
        scaleSite();
        adjustHeroHeight();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyScaling);
    } else {
        // DOM이 이미 로드된 경우 즉시 실행
        applyScaling();
    }
})();

// 비디오 위치 강제 고정 함수 (전역 함수로 정의)
window.fixVideoPosition = function() {
    const videoWrapper = document.querySelector('.hero-video-wrapper');
    const video = document.querySelector('.hero-video');
    if (!videoWrapper || !video) return;
    
    // body의 scale 값 가져오기
    const currentWidth = window.innerWidth;
    const baseWidth = 1920;
    const currentHeight = window.innerHeight;
    const baseHeight = 1080;
    
    const scaleX = currentWidth / baseWidth;
    const scaleY = currentHeight / baseHeight;
    const scale = currentWidth > baseWidth ? 1 : Math.min(Math.min(scaleX, scaleY), 1);
    
    // body의 scale을 상쇄하기 위한 역scale
    const inverseScale = 1 / scale;
    
    // 세로 해상도가 작을수록 위치를 더 위로
    let topPercent = 42;
    if (currentHeight < baseHeight) {
        // 세로가 작으면 더 위로 올림
        topPercent = 38 + (currentHeight / baseHeight) * 4;
    }
    
    // 동영상 크기 고정 (가로만 줄임, 세로는 유지)
    const videoWidth = 500;
    const videoHeight = 580;
    
    videoWrapper.style.position = 'absolute';
    videoWrapper.style.top = `${topPercent}%`;
    videoWrapper.style.left = '70%';
    videoWrapper.style.width = `${videoWidth}px`;
    videoWrapper.style.height = `${videoHeight}px`;
    // body의 scale을 상쇄하기 위해 역scale 적용
    videoWrapper.style.transform = `translate(-50%, -50%) scale(${inverseScale}) perspective(1000px) rotateX(5deg) rotateY(12deg) rotateZ(-1deg)`;
    videoWrapper.style.transformStyle = 'preserve-3d';
    
};

// 페이지 로드 시 애니메이션
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    scaleSite(); // 한 번 더 확인
    adjustHeroHeight();
    
    // 스케일링 후 주기적 확인이 자동으로 네비게이션 바를 업데이트함
    
    // 동영상 위치 고정 및 더블클릭 방지
    const videoWrapper = document.querySelector('.hero-video-wrapper');
    const video = document.querySelector('.hero-video');
    const navBrand = document.querySelector('.nav-brand');
    
    if (videoWrapper && video) {
        // 더블클릭 이벤트 차단
        videoWrapper.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        
        video.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        
        // 비디오 기본 동작 차단
        video.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        
        // 주기적으로 위치 확인 및 수정
        if (window.fixVideoPosition) {
            setInterval(window.fixVideoPosition, 100);
            window.addEventListener('resize', window.fixVideoPosition);
        }
    }
    
    // 네비게이션 바 위치는 scaleSite() 함수에서 자동으로 관리됨
    // 리사이즈 시 네비게이션 바 위치는 scaleSite()에서 자동으로 재확인됨
    
    // 동영상은 7초로 자른 후 자동으로 loop됩니다
});

// 모니터마다 일관된 높이 설정 (모바일 주소창 문제 해결)
function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // 실제 뷰포트 높이 계산 (모바일 주소창 제외)
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // 히어로 섹션 높이를 800px로 고정
    // 세로 창 크기와 관계없이 일정하게 유지
    const heroHeight = 800; // 800px 고정
    hero.style.height = `${heroHeight}px`;
    hero.style.minHeight = `${heroHeight}px`;
    hero.style.maxHeight = `${heroHeight}px`;
}

// 리사이즈 시에도 높이 재조정
window.addEventListener('resize', () => {
    scaleSite();
    adjustHeroHeight();
    setTimeout(() => {
        handleFullscreenChange();
        // 네비게이션 바는 주기적 확인으로 자동 업데이트됨
    }, 100);
});

// 전체화면 변경 시에도 스케일 재조정 (중복 제거됨 - 아래 handleFullscreenChange에서 처리)

// 화면 방향 변경 시 (모바일)
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        scaleSite();
        adjustHeroHeight();
        // 네비게이션 바는 주기적 확인으로 자동 업데이트됨
    }, 100);
});

// 전체화면 모드 감지 및 조정
function handleFullscreenChange() {
    const hero = document.querySelector('.hero');
    const video = document.querySelector('.hero-video');
    const videoWrapper = document.querySelector('.hero-video-wrapper');
    const navBrand = document.querySelector('.nav-brand');
    if (!hero || !video || !videoWrapper) return;
    
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    
    // 전체화면 모드와 일반 모드 모두 동일하게 유지
    hero.classList.toggle('fullscreen-mode', !!isFullscreen);
    
    // 비디오 래퍼 위치 강제 고정 (세로 해상도에 따라 조정)
    const currentHeight = window.innerHeight;
    const baseHeight = 1080;
    let topPercent = 42;
    if (currentHeight < baseHeight) {
        // 세로가 작으면 더 위로 올림
        topPercent = 38 + (currentHeight / baseHeight) * 4;
    }
    
    // 동영상 크기 고정 (가로만 줄임, 세로는 유지)
    const videoWidth = 500;
    const videoHeight = 580;
    
    videoWrapper.style.position = 'absolute';
    videoWrapper.style.top = `${topPercent}%`;
    videoWrapper.style.left = '70%';
    videoWrapper.style.width = `${videoWidth}px`;
    videoWrapper.style.height = `${videoHeight}px`;
    videoWrapper.style.transform = 'translate(-50%, -50%) perspective(1000px) rotateX(5deg) rotateY(12deg) rotateZ(-1deg)';
    videoWrapper.style.transformStyle = 'preserve-3d';
    videoWrapper.style.zIndex = '0';
    
    // 동영상 스타일 설정
    video.style.objectFit = 'cover';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.maxWidth = '100%';
    video.style.maxHeight = '100%';
    video.style.position = 'relative';
    video.style.top = '0';
    video.style.left = '0';
    video.style.transform = 'none';
    
    // 네비게이션 바 위치는 scaleSite() 함수에서 스케일에 맞춰 자동 조정됨
    // 여기서는 별도 처리 불필요
    
    // 전체화면 모드에서도 주기적 확인이 자동으로 네비게이션 바를 업데이트함
    
    // 히어로 높이는 항상 65vh로 유지
    adjustHeroHeight();
}

// 전체화면 변경 감지 (모든 브라우저 지원)
document.addEventListener('fullscreenchange', () => {
    // 전체화면 모드 변경 시 화면 크기가 완전히 업데이트될 때까지 대기
    setTimeout(() => {
        scaleSite();
        handleFullscreenChange();
        
        // 한 번 더 확인하여 정확한 위치 보장
        setTimeout(() => {
            scaleSite();
        }, 50);
    }, 150);
});
document.addEventListener('webkitfullscreenchange', () => {
    setTimeout(() => {
        scaleSite();
        handleFullscreenChange();
        
        setTimeout(() => {
            scaleSite();
        }, 50);
    }, 150);
});
document.addEventListener('mozfullscreenchange', () => {
    setTimeout(() => {
        scaleSite();
        handleFullscreenChange();
        
        setTimeout(() => {
            scaleSite();
        }, 50);
    }, 150);
});
document.addEventListener('MSFullscreenChange', () => {
    setTimeout(() => {
        scaleSite();
        handleFullscreenChange();
        
        setTimeout(() => {
            scaleSite();
        }, 50);
    }, 150);
});

// 리사이즈 이벤트로도 체크 (일부 브라우저에서 필요)
window.addEventListener('resize', () => {
    setTimeout(() => {
        handleFullscreenChange();
        // 네비게이션 바는 주기적 확인으로 자동 업데이트됨
    }, 100);
});

// 파티클 효과 (선택적 - 활성화하려면 아래 주석 해제)
function createParticle() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = 'rgba(99, 102, 241, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.pointerEvents = 'none';
    particle.style.boxShadow = '0 0 6px rgba(99, 102, 241, 0.8)';
    
    hero.appendChild(particle);
    
    const duration = 4000 + Math.random() * 3000;
    const xMove = (Math.random() - 0.5) * 200;
    
    particle.animate([
        { 
            transform: 'translateY(0) translateX(0) scale(0)', 
            opacity: 0 
        },
        { 
            transform: `translateY(-${hero.offsetHeight + 100}px) translateX(${xMove}px) scale(1)`, 
            opacity: 0.8 
        },
        { 
            transform: `translateY(-${hero.offsetHeight + 200}px) translateX(${xMove * 1.5}px) scale(0)`, 
            opacity: 0 
        }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

// 파티클 효과 시작 (원하면 주석 해제)
// setInterval(createParticle, 500);

