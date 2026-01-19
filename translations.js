// ===== Translations (i18n) =====
const translations = {
    en: {
        // Meta
        pageTitle: 'GIF Converter - Convert Videos to GIF',
        pageDescription: 'Easily convert videos to GIF. Customize size, frame rate, and quality. Discord size guide included.',

        // Navigation
        navConvert: 'Convert',
        navSettings: 'Settings',
        navDiscord: 'Discord Guide',

        // Hero
        heroTitle: 'Convert Videos to',
        heroTitleGIF: 'GIF',
        heroSubtitle: 'Create high-quality GIFs in your browser. Customize size, frame rate, and quality freely.',

        // Upload
        uploadTitle: 'Drop Video Here',
        uploadSubtitle: 'or click to select a file',
        uploadFormats: 'MP4, WebM, MOV, AVI supported',
        processing: 'Processing...',

        // Preview
        preview: 'Preview',

        // Settings
        settingsTitle: 'GIF Settings',
        outputWidth: 'Output Width',
        originalSize: 'Original Size',
        widthHint: 'Smaller sizes result in smaller file sizes',
        frameRate: 'Frame Rate',
        frameRateHint: 'Higher = smoother but larger file',
        quality: 'Quality',
        qualityLow: 'Low (Light)',
        qualityMedium: 'Medium (Balanced)',
        qualityHigh: 'High (Quality)',
        qualityMax: 'Maximum (Heavy)',
        qualityHint: 'Adjusts color accuracy',
        maxDuration: 'Max Duration',
        seconds: 'seconds',
        durationHint: 'Discord recommended: 10 seconds or less',

        // Chroma Key
        chromaKey: 'Chroma Key',
        chromaKeyEnable: 'Enable Transparency',
        chromaKeyColor: 'Transparent Color',
        chromaKeyEyedropper: 'Pick from Video',
        chromaKeyTolerance: 'Tolerance',
        chromaKeyHint: 'Remove background color from GIF',
        chromaKeyPreview: 'Preview Transparency',
        chromaKeyPreviewTitle: 'Transparency Preview',
        chromaKeyPreviewHint: 'Checkered = transparent. Click to pick color.',

        // Size Estimation
        estimatedSize: 'Estimated Size',
        estimateHint: 'Actual size may vary based on video content',
        frames: 'frames',

        // Convert Button
        convertToGif: 'Convert to GIF',

        // Progress
        preparing: 'Preparing...',
        extractingFrames: 'Extracting frames...',
        generatingGif: 'Generating GIF...',

        // Result
        conversionComplete: '🎉 Conversion Complete!',
        download: 'Download',
        convertNewVideo: 'Convert New Video',

        // Discord Info
        discordTitle: 'Discord Emoji & Sticker Guidelines',
        discordEmoji: 'Emoji',
        discordSticker: 'Sticker',
        discordFileSize: 'File Size:',
        discordDimensions: 'Dimensions:',
        discordFormat: 'Format:',
        discordAnimated: 'Animated:',
        discordAutoResize: 'Auto-resize:',
        discordTransparent: 'Transparent BG:',
        discordEmojiHint: '💡 Auto-resized. Just keep under 256KB!',
        discordStickerHint: '💡 320×320px, transparent BG required',

        // Twitch
        twitchTitle: 'Twitch Emote',
        twitchAutoMode: 'Auto-resize',
        twitchManualMode: 'Manual',
        twitchAutoHint: '💡 Upload 1 image, auto-resized to 28/56/112px',
        twitchManualHint: '💡 Must be square, transparent BG, max 60 frames',

        // Share
        shareOnX: 'Share on X',

        // Footer
        footerText: '© 2026 GIF Converter - Free browser-based GIF conversion tool',

        // Errors
        errorVideoLoad: 'Failed to load video. Please try a different file.',
        errorConversion: 'Conversion failed.',
        errorDropVideo: 'Please drop a video file.',
        errorNoVideo: 'Please upload a video first.',

        // Language
        language: 'Language'
    },
    ja: {
        // Meta
        pageTitle: 'GIF Converter - 動画をGIFに変換',
        pageDescription: '動画をGIFに簡単変換。サイズ、フレームレート、品質を自由にカスタマイズ。Discord対応サイズガイド付き。',

        // Navigation
        navConvert: '変換',
        navSettings: '設定',
        navDiscord: 'Discord基準',

        // Hero
        heroTitle: '動画を',
        heroTitleGIF: 'GIF',
        heroSubtitle: '高品質なGIFをブラウザだけで作成。サイズ、フレームレート、品質を自由にカスタマイズ。',

        // Upload
        uploadTitle: '動画をドロップ',
        uploadSubtitle: 'またはクリックしてファイルを選択',
        uploadFormats: 'MP4, WebM, MOV, AVI対応',
        processing: '処理中...',

        // Preview
        preview: 'プレビュー',

        // Settings
        settingsTitle: 'GIF設定',
        outputWidth: '出力幅',
        originalSize: '元のサイズ',
        widthHint: '小さいほどファイルサイズも小さくなります',
        frameRate: 'フレームレート',
        frameRateHint: '高いほど滑らかですがファイルサイズが増加',
        quality: '品質',
        qualityLow: '低（軽量）',
        qualityMedium: '中（バランス）',
        qualityHigh: '高（高品質）',
        qualityMax: '最高（重い）',
        qualityHint: '色の再現精度を調整します',
        maxDuration: '最大時間',
        seconds: '秒',
        durationHint: 'Discord推奨: 10秒以下',

        // Chroma Key
        chromaKey: 'クロマキー',
        chromaKeyEnable: '透過を有効化',
        chromaKeyColor: '透過する色',
        chromaKeyEyedropper: '動画から選択',
        chromaKeyTolerance: '許容範囲',
        chromaKeyHint: 'GIFから背景色を透過します',
        chromaKeyPreview: '透過プレビュー',
        chromaKeyPreviewTitle: '透過プレビュー',
        chromaKeyPreviewHint: 'チェック柄＝透過。クリックで色選択。',

        // Size Estimation
        estimatedSize: '推定サイズ',
        estimateHint: '実際のサイズは動画内容により異なります',
        frames: 'フレーム',

        // Convert Button
        convertToGif: 'GIFに変換',

        // Progress
        preparing: '準備中...',
        extractingFrames: 'フレームを抽出中...',
        generatingGif: 'GIFを生成中...',

        // Result
        conversionComplete: '🎉 変換完了!',
        download: 'ダウンロード',
        convertNewVideo: '新しい動画を変換',

        // Discord Info
        discordTitle: 'Discord 絵文字・スタンプ基準',
        discordEmoji: '絵文字',
        discordSticker: 'スタンプ',
        discordFileSize: 'ファイルサイズ:',
        discordDimensions: 'サイズ:',
        discordFormat: '形式:',
        discordAnimated: 'アニメ:',
        discordAutoResize: '自動リサイズ:',
        discordTransparent: '透過背景:',
        discordEmojiHint: '💡 自動リサイズ。256KB以内でOK！',
        discordStickerHint: '💡 320×320px固定、透過背景必須',

        // Twitch
        twitchTitle: 'Twitch スタンプ',
        twitchAutoMode: '自動リサイズ',
        twitchManualMode: '手動',
        twitchAutoHint: '💡 1枚アップロードで28/56/112pxに自動リサイズ',
        twitchManualHint: '💡 正方形、透過背景、最大60フレーム',

        // Share
        shareOnX: 'Xでシェア',

        // Footer
        footerText: '© 2026 GIF Converter - ブラウザだけで完結する無料GIF変換ツール',

        // Errors
        errorVideoLoad: '動画の読み込みに失敗しました。別のファイルをお試しください。',
        errorConversion: '変換に失敗しました。',
        errorDropVideo: '動画ファイルをドロップしてください。',
        errorNoVideo: 'まず動画をアップロードしてください。',

        // Language
        language: '言語'
    },
    es: {
        // Meta
        pageTitle: 'GIF Converter - Convertir Videos a GIF',
        pageDescription: 'Convierte videos a GIF fácilmente. Personaliza tamaño, velocidad y calidad. Guía de Discord incluida.',

        // Navigation
        navConvert: 'Convertir',
        navSettings: 'Ajustes',
        navDiscord: 'Guía Discord',

        // Hero
        heroTitle: 'Convierte Videos a',
        heroTitleGIF: 'GIF',
        heroSubtitle: 'Crea GIFs de alta calidad en tu navegador. Personaliza tamaño, velocidad y calidad libremente.',

        // Upload
        uploadTitle: 'Arrastra un Video Aquí',
        uploadSubtitle: 'o haz clic para seleccionar',
        uploadFormats: 'MP4, WebM, MOV, AVI soportados',
        processing: 'Procesando...',

        // Preview
        preview: 'Vista Previa',

        // Settings
        settingsTitle: 'Ajustes de GIF',
        outputWidth: 'Ancho de Salida',
        originalSize: 'Tamaño Original',
        widthHint: 'Tamaños más pequeños = archivos más pequeños',
        frameRate: 'Velocidad',
        frameRateHint: 'Mayor = más suave pero archivo más grande',
        quality: 'Calidad',
        qualityLow: 'Baja (Ligera)',
        qualityMedium: 'Media (Balanceada)',
        qualityHigh: 'Alta (Calidad)',
        qualityMax: 'Máxima (Pesada)',
        qualityHint: 'Ajusta la precisión del color',
        maxDuration: 'Duración Máxima',
        seconds: 'segundos',
        durationHint: 'Discord recomienda: 10 segundos o menos',

        // Chroma Key
        chromaKey: 'Croma',
        chromaKeyEnable: 'Habilitar Transparencia',
        chromaKeyColor: 'Color Transparente',
        chromaKeyEyedropper: 'Seleccionar del Video',
        chromaKeyTolerance: 'Tolerancia',
        chromaKeyHint: 'Elimina el color de fondo del GIF',
        chromaKeyPreview: 'Vista Previa de Transparencia',
        chromaKeyPreviewTitle: 'Vista Previa de Transparencia',
        chromaKeyPreviewHint: 'El patrón de cuadros muestra áreas transparentes',

        // Size Estimation
        estimatedSize: 'Tamaño Estimado',
        estimateHint: 'El tamaño real puede variar según el contenido',
        frames: 'fotogramas',

        // Convert Button
        convertToGif: 'Convertir a GIF',

        // Progress
        preparing: 'Preparando...',
        extractingFrames: 'Extrayendo fotogramas...',
        generatingGif: 'Generando GIF...',

        // Result
        conversionComplete: '🎉 ¡Conversión Completa!',
        download: 'Descargar',
        convertNewVideo: 'Convertir Nuevo Video',

        // Discord Info
        discordTitle: 'Guía de GIF para Discord',
        fileSize: 'Tamaño de Archivo',
        normalUser: 'Usuario Normal:',
        nitroBasic: 'Nitro Basic:',
        nitro: 'Nitro:',
        emoji: 'Emoji:',
        recommendedSize: 'Tamaño Recomendado',
        optimalResolution: 'Resolución Óptima:',
        for169: 'Para 16:9:',
        maxResolution: 'Resolución Máxima:',
        animation: 'Animación',
        recommendedFps: 'FPS Recomendados:',
        recommendedDuration: 'Duración Recomendada:',
        colors: 'Colores:',
        optimalColors: 'Colores Óptimos:',
        optimizationTips: 'Consejos de Optimización',
        tip1: 'Elimina fotogramas innecesarios',
        tip2: 'Usa fondos simples',
        tip3: 'Corta secciones con poco movimiento',
        tip4: 'Reduce colores para menor tamaño',

        // Footer
        footerText: '© 2026 GIF Converter - Herramienta gratuita de conversión de GIF',

        // Errors
        errorVideoLoad: 'Error al cargar el video. Intenta con otro archivo.',
        errorConversion: 'Error en la conversión.',
        errorDropVideo: 'Por favor arrastra un archivo de video.',
        errorNoVideo: 'Por favor sube un video primero.',

        // Language
        language: 'Idioma'
    },
    zh: {
        // Meta
        pageTitle: 'GIF转换器 - 视频转GIF',
        pageDescription: '轻松将视频转换为GIF。自定义大小、帧率和质量。包含Discord尺寸指南。',

        // Navigation
        navConvert: '转换',
        navSettings: '设置',
        navDiscord: 'Discord指南',

        // Hero
        heroTitle: '将视频转换为',
        heroTitleGIF: 'GIF',
        heroSubtitle: '在浏览器中创建高质量GIF。自由调整大小、帧率和质量。',

        // Upload
        uploadTitle: '拖放视频到这里',
        uploadSubtitle: '或点击选择文件',
        uploadFormats: '支持MP4、WebM、MOV、AVI',
        processing: '处理中...',

        // Preview
        preview: '预览',

        // Settings
        settingsTitle: 'GIF设置',
        outputWidth: '输出宽度',
        originalSize: '原始大小',
        widthHint: '较小的尺寸 = 较小的文件',
        frameRate: '帧率',
        frameRateHint: '越高越流畅，但文件越大',
        quality: '质量',
        qualityLow: '低（轻量）',
        qualityMedium: '中（平衡）',
        qualityHigh: '高（优质）',
        qualityMax: '最高（较大）',
        qualityHint: '调整颜色精度',
        maxDuration: '最大时长',
        seconds: '秒',
        durationHint: 'Discord推荐：10秒或更短',

        // Chroma Key
        chromaKey: '色度键',
        chromaKeyEnable: '启用透明',
        chromaKeyColor: '透明颜色',
        chromaKeyEyedropper: '从视频选取',
        chromaKeyTolerance: '容差',
        chromaKeyHint: '从GIF中移除背景颜色',
        chromaKeyPreview: '透明预览',
        chromaKeyPreviewTitle: '透明预览',
        chromaKeyPreviewHint: '棋盘格图案显示透明区域',

        // Size Estimation
        estimatedSize: '预估大小',
        estimateHint: '实际大小可能因视频内容而异',
        frames: '帧',

        // Convert Button
        convertToGif: '转换为GIF',

        // Progress
        preparing: '准备中...',
        extractingFrames: '提取帧中...',
        generatingGif: '生成GIF中...',

        // Result
        conversionComplete: '🎉 转换完成！',
        download: '下载',
        convertNewVideo: '转换新视频',

        // Discord Info
        discordTitle: 'Discord GIF上传指南',
        fileSize: '文件大小',
        normalUser: '普通用户：',
        nitroBasic: 'Nitro Basic：',
        nitro: 'Nitro：',
        emoji: '表情：',
        recommendedSize: '推荐大小',
        optimalResolution: '最佳分辨率：',
        for169: '16:9格式：',
        maxResolution: '最大分辨率：',
        animation: '动画',
        recommendedFps: '推荐帧率：',
        recommendedDuration: '推荐时长：',
        colors: '颜色：',
        optimalColors: '最佳颜色数：',
        optimizationTips: '优化技巧',
        tip1: '删除不必要的帧',
        tip2: '使用简单的背景',
        tip3: '剪切运动较少的部分',
        tip4: '减少颜色以缩小文件',

        // Footer
        footerText: '© 2026 GIF Converter - 免费浏览器GIF转换工具',

        // Errors
        errorVideoLoad: '视频加载失败，请尝试其他文件。',
        errorConversion: '转换失败。',
        errorDropVideo: '请拖放视频文件。',
        errorNoVideo: '请先上传视频。',

        // Language
        language: '语言'
    },
    ko: {
        // Meta
        pageTitle: 'GIF 변환기 - 동영상을 GIF로 변환',
        pageDescription: '동영상을 GIF로 쉽게 변환. 크기, 프레임 속도, 품질을 자유롭게 조정. Discord 가이드 포함.',

        // Navigation
        navConvert: '변환',
        navSettings: '설정',
        navDiscord: 'Discord 가이드',

        // Hero
        heroTitle: '동영상을',
        heroTitleGIF: 'GIF',
        heroSubtitle: '브라우저에서 고품질 GIF를 만드세요. 크기, 프레임 속도, 품질을 자유롭게 조정.',

        // Upload
        uploadTitle: '동영상을 여기에 드롭',
        uploadSubtitle: '또는 클릭하여 파일 선택',
        uploadFormats: 'MP4, WebM, MOV, AVI 지원',
        processing: '처리 중...',

        // Preview
        preview: '미리보기',

        // Settings
        settingsTitle: 'GIF 설정',
        outputWidth: '출력 너비',
        originalSize: '원본 크기',
        widthHint: '작은 크기 = 작은 파일 크기',
        frameRate: '프레임 속도',
        frameRateHint: '높을수록 부드럽지만 파일 크기 증가',
        quality: '품질',
        qualityLow: '낮음 (가벼움)',
        qualityMedium: '중간 (균형)',
        qualityHigh: '높음 (고품질)',
        qualityMax: '최고 (무거움)',
        qualityHint: '색상 정확도 조정',
        maxDuration: '최대 길이',
        seconds: '초',
        durationHint: 'Discord 권장: 10초 이하',

        // Chroma Key
        chromaKey: '크로마키',
        chromaKeyEnable: '투명 활성화',
        chromaKeyColor: '투명 색상',
        chromaKeyEyedropper: '동영상에서 선택',
        chromaKeyTolerance: '허용 범위',
        chromaKeyHint: 'GIF에서 배경색 제거',
        chromaKeyPreview: '투명 미리보기',
        chromaKeyPreviewTitle: '투명 미리보기',
        chromaKeyPreviewHint: '체크 패턴이 투명 영역을 표시합니다',

        // Size Estimation
        estimatedSize: '예상 크기',
        estimateHint: '실제 크기는 동영상 내용에 따라 다를 수 있습니다',
        frames: '프레임',

        // Convert Button
        convertToGif: 'GIF로 변환',

        // Progress
        preparing: '준비 중...',
        extractingFrames: '프레임 추출 중...',
        generatingGif: 'GIF 생성 중...',

        // Result
        conversionComplete: '🎉 변환 완료!',
        download: '다운로드',
        convertNewVideo: '새 동영상 변환',

        // Discord Info
        discordTitle: 'Discord GIF 업로드 가이드',
        fileSize: '파일 크기',
        normalUser: '일반 사용자:',
        nitroBasic: 'Nitro Basic:',
        nitro: 'Nitro:',
        emoji: '이모지:',
        recommendedSize: '권장 크기',
        optimalResolution: '최적 해상도:',
        for169: '16:9 비율:',
        maxResolution: '최대 해상도:',
        animation: '애니메이션',
        recommendedFps: '권장 FPS:',
        recommendedDuration: '권장 길이:',
        colors: '색상:',
        optimalColors: '최적 색상:',
        optimizationTips: '최적화 팁',
        tip1: '불필요한 프레임 제거',
        tip2: '단순한 배경 사용',
        tip3: '움직임이 적은 부분 자르기',
        tip4: '색상 수를 줄여 파일 크기 축소',

        // Footer
        footerText: '© 2026 GIF Converter - 무료 브라우저 기반 GIF 변환 도구',

        // Errors
        errorVideoLoad: '동영상 로드에 실패했습니다. 다른 파일을 시도해 주세요.',
        errorConversion: '변환에 실패했습니다.',
        errorDropVideo: '동영상 파일을 드롭해 주세요.',
        errorNoVideo: '먼저 동영상을 업로드하세요.',

        // Language
        language: '언어'
    }
};

// Get current language from localStorage or default to English
function getCurrentLanguage() {
    return localStorage.getItem('gif-converter-lang') || 'en';
}

// Set language and save to localStorage
function setLanguage(lang) {
    localStorage.setItem('gif-converter-lang', lang);
    applyTranslations(lang);
    document.documentElement.lang = lang;
}

// Get translation for a key
function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang][key] || translations['en'][key] || key;
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update page title
    document.title = translations[lang].pageTitle;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', translations[lang].pageDescription);
    }

    // Update select options with data-i18n-value attribute
    const options = document.querySelectorAll('[data-i18n-value]');
    options.forEach(opt => {
        const key = opt.getAttribute('data-i18n-value');
        if (translations[lang] && translations[lang][key]) {
            opt.textContent = translations[lang][key];
        }
    });
}

// Export for use in app.js
window.i18n = {
    translations,
    getCurrentLanguage,
    setLanguage,
    t,
    applyTranslations
};
