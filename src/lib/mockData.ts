import { AnalysisResult, Language } from './types';

export const simulateAnalysis = (imageUrl: string | null, lang: Language): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      
      const enResult: AnalysisResult = {
        imageUrl,
        undertone: 'cool',
        faceShape: 'oval',
        colorPalette: {
          season: 'Cool Summer',
          description: 'Your coloring is distinctly cool, soft, and slightly muted. You shine in elegant, dusty pastels and cool neutrals.',
          bestColors: [
            { 
              hex: '#7C8D9B', name: 'Slate Blue', 
              reason: 'Complements your cool undertones without overpowering your soft contrast.',
              combinations: 'Pairs beautifully with soft white or charcoal grey for a sophisticated look.'
            },
            { 
              hex: '#E4C9D3', name: 'Dusty Rose', 
              reason: 'Brings out a natural, healthy flush in cool-toned skin.',
              combinations: 'Mix with slate blue or navy for an elegant, romantic aesthetic.'
            },
            { 
              hex: '#4A6984', name: 'Soft Navy', 
              reason: 'Acts as your perfect dark neutral instead of harsh black.',
              combinations: 'Ideal for foundational wardrobe pieces like blazers and trousers.'
            }
          ],
          avoidColors: [
            { hex: '#E6A817', name: 'Mustard Yellow', reason: 'Clashes with cool undertones, making skin look sallow.', combinations: 'Avoid entirely near the face.' },
            { hex: '#D35400', name: 'Warm Orange', reason: 'Too warm and vibrant; overpowers soft summer coloring.', combinations: 'Avoid entirely near the face.' }
          ],
          makeup: {
            foundation: 'Cool/Pink Undertone',
            blush: 'Soft Rose or Mauve',
            eyeshadow: 'Taupe, Slate Grey, or Soft Plum',
            lipstick: 'Dusty Rose, Plum, or Soft Raspberry',
          },
          metals: ['Silver', 'White Gold', 'Platinum']
        },
        styling: {
          haircuts: [
            { 
              name: 'Long Layers', 
              reason: 'Adds movement and softness without hiding your naturally balanced oval shape.',
              changes: 'Frames the cheekbones and adds volume at the shoulders.',
            },
            { 
              name: 'Straight Bob', 
              reason: 'A strong, structured cut contrasts nicely with the soft, curved lines of an oval face.',
              changes: 'Draws attention to the jawline and neck, sharpening your profile.',
            }
          ],
          haircutAvoid: ['Styles with excessive volume on top that elongate the face unnecessarily'],
          glasses: [
            {
              name: 'Wayfarer',
              reason: 'The slight angularity adds definition to the rounded curves of your oval face.',
              changes: 'Broadens the upper third of the face subtly, grounding your look.'
            },
            {
              name: 'Cat-Eye',
              reason: 'Lifts the face upward and outward, highlighting the cheekbones.',
              changes: 'Adds a playful, dramatic sweep that enhances facial symmetry.'
            }
          ],
          glassesAvoid: ['Oversized frames that hide your balanced features'],
          hairColors: [
            { 
              hex: '#3b2f2f', name: 'Ash Brown', 
              reason: 'A cool-toned brown that harmonizes perfectly with a cool summer complexion, eliminating brassiness.',
              combinations: 'Looks stunning with pale blue eyes or cool skin.'
            },
            { 
              hex: '#8C7A6B', name: 'Mushroom Blonde', 
              reason: 'An ashy, muted blonde that falls exactly into the cool summer palette.',
              combinations: 'Perfect for adding dimension without warmth. Pair with silver jewelry.'
            }
          ]
        }
      };

      const trResult: AnalysisResult = {
        imageUrl,
        undertone: 'cool',
        faceShape: 'oval',
        colorPalette: {
          season: 'Soğuk Yaz (Cool Summer)',
          description: 'Renk tonlarınız belirgin şekilde soğuk, yumuşak ve hafif muted (puslu). Zarif, tozlu pasteller ve soğuk nötr renklerde parlıyorsunuz.',
          bestColors: [
            { 
              hex: '#7C8D9B', name: 'Arduvaz Mavisi', 
              reason: 'Yumuşak kontrastınızı bastırmadan, soğuk alt tonlarınızı mükemmel şekilde tamamlar.',
              combinations: 'Sofistike bir görünüm için yumuşak beyaz veya antrasit gri ile harika uyum sağlar.'
            },
            { 
              hex: '#E4C9D3', name: 'Gül Kurusu', 
              reason: 'Soğuk alt tonlu ciltlerde doğal, sağlıklı bir canlılık (allık etkisi) yaratır.',
              combinations: 'Zarif ve romantik bir estetik için arduvaz mavisi veya lacivert ile karıştırın.'
            },
            { 
              hex: '#4A6984', name: 'Yumuşak Lacivert', 
              reason: 'Sert ve yorucu olan siyah yerine kullanabileceğiniz mükemmel, karanlık ana nötr renginizdir.',
              combinations: 'Blazer ceket ve pantolon gibi temel gardırop parçaları için idealdir.'
            }
          ],
          avoidColors: [
            { hex: '#E6A817', name: 'Hardal Sarısı', reason: 'Soğuk alt tonlarla çatışır, cildin soluk ve hastalıklı (sarımtırak) görünmesine neden olur.', combinations: 'Özellikle yüzünüze yakın kullanmaktan tamamen kaçının.' },
            { hex: '#D35400', name: 'Sıcak Turuncu', reason: 'Çok sıcak ve canlıdır; "soft summer" (yumuşak yaz) renklerinizi gölgede bırakır.', combinations: 'Yüzüne yakın kullanmaktan tamamen kaçının.' }
          ],
          makeup: {
            foundation: 'Soğuk / Pembe Alt Tonlu',
            blush: 'Yumuşak Gül veya Leylak (Mauve)',
            eyeshadow: 'Boz Kahve (Taupe), Arduvaz Grisi veya Yumuşak Erik',
            lipstick: 'Gül Kurusu, Mürdüm veya Ahududu',
          },
          metals: ['Gümüş', 'Beyaz Altın', 'Platin']
        },
        styling: {
          haircuts: [
            { 
              name: 'Uzun Katlı Kesim (Long Layers)', 
              reason: 'Doğal olarak dengeli olan Oval yüz şeklinizi saklamadan saça hareket ve yumuşaklık katar.',
              changes: 'Elmacık kemiklerini çerçeveler ve omuzlarda hacim yaratarak yüzün alt kısmını dengeler.',
            },
            { 
              name: 'Küt Bob (Straight Bob)', 
              reason: 'Güçlü ve yapılandırılmış bir kesim, oval yüzün yumuşak ve kavisli hatlarıyla çok estetik bir zıtlık oluşturur.',
              changes: 'Dikkatleri çene hattına ve boyun bölgesine çeker, profilinizi keskinleştirir.'
            }
          ],
          haircutAvoid: ['Yüzü gereksiz yere olduğundan daha uzun gösteren çok yüksek hacimli modeller.'],
          glasses: [
            {
              name: 'Wayfarer (Klasik Köşeli)',
              reason: 'Hafif köşeli yapısı, oval yüzünüzün yuvarlak hatlarına tanım ve karakter katar.',
              changes: 'Yüzün üst üçte birlik kısmını hafifçe genişleterek bakışlarınızı güçlendirir ve denge sağlar.'
            },
            {
              name: 'Cat-Eye (Kedi Gözü)',
              reason: 'Yüzü yukarı ve dışa doğru çekerek, elmacık kemiklerinizi ön plana çıkarır.',
              changes: 'Yüz simetrisini artıran, eğlenceli ve dramatik bir yukarı doğru çekiklik katar.'
            }
          ],
          glassesAvoid: ['Dengeli ve orantılı hatlarınızı tamamen gizleyen aşırı büyük (oversized) çerçeveler.'],
          hairColors: [
            { 
              hex: '#3b2f2f', name: 'Küllü Kahve (Ash Brown)', 
              reason: 'Soğuk yaz (cool summer) teniyle mükemmel uyum sağlayan, kızıllık barındırmayan soğuk tonlu bir kahvedir.',
              combinations: 'Açık renk gözler veya soğuk/beyaz ten ile büyüleyici ve asil durur.'
            },
            { 
              hex: '#8C7A6B', name: 'Mantar Sarısı (Mushroom Blonde)', 
              reason: 'Küllü, sessiz ve mat bir sarı tonudur; tam olarak soğuk yaz paletinin kalbine oturur.',
              combinations: 'Saça sıcaklık katmadan boyut (gölge) kazandırmak için mükemmeldir. Gümüş takılarla kombinleyin.'
            }
          ]
        }
      };

      resolve(lang === 'tr' ? trResult : enResult);

    }, 3000); 
  });
};
