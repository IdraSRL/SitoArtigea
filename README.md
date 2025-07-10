# Sito Web Artigea s.r.l.

Sito web ottimizzato per Artigea s.r.l., azienda specializzata in servizi di pulizia professionale a Pisa e provincia.

## 🚀 Caratteristiche

- **Design moderno e responsive** con layout ottimizzato per tutti i dispositivi
- **SEO avanzato** con structured data, meta tags completi e ottimizzazioni AI
- **Performance elevate** con preload, lazy loading e ottimizzazioni Core Web Vitals
- **GDPR compliance** completo con cookie consent granulare
- **Accessibilità WCAG 2.1 AA** con supporto screen reader e navigazione da tastiera
- **Sistema di blog** con filtri interattivi e categorizzazione
- **Ottimizzazione AI** con markup semantico e structured data avanzati

## 🎨 Design System

### Colori
- **Primario**: #a14e97 (Viola aziendale Artigea)
- **Secondario**: #00a0dc (Blu aziendale Artigea)
- **Accent**: #f59e0b (Arancione energia per CTA)
- **Sfondo**: #f1f3f4 (Grigio chiaro professionale)
- **Testo**: #2d3748 (Grigio scuro per leggibilità)

### Typography
- **Font famiglia**: Inter, system-ui, sans-serif
- **Line height**: 150% per il corpo, 120% per i titoli
- **Pesi**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spaziatura
Sistema a 8px con variabili CSS personalizzate per consistenza e scalabilità.

## 📁 Struttura del Progetto

```
/
├── index.html              # Homepage principale
├── blog/
│   ├── template.html       # Template per articoli blog
│   └── index.html          # Pagina indice blog (da creare)
├── css/
│   ├── main.css           # Stili principali e variabili
│   ├── components.css     # Componenti riutilizzabili
│   └── blog.css          # Stili specifici per il blog
├── js/
│   ├── main.js           # Funzionalità principali
│   ├── cookie-consent.js # Gestione cookie e GDPR
│   └── blog-filters.js   # Sistema filtri blog
├── assets/
│   ├── site.webmanifest         # Manifest PWA
│   ├── favicon-*.png            # Favicon varie dimensioni
│   ├── PulizeCivili.webp        # Immagini servizi ottimizzate
│   ├── PulizieIndustriali.webp  # Formato WebP per performance
│   ├── PulizieSanificazioni.webp
│   └── PulizieVetri.webp
├── img/
│   ├── logo.svg                 # Logo SVG ottimizzato
│   └── LogoCompleto.png         # Logo completo
├── privacy-policy.html     # Privacy policy GDPR
├── cookie-policy.html      # Cookie policy
├── note-legali.html       # Note legali
├── robots.txt             # Direttive per crawler
├── sitemap.xml           # Mappa del sito
└── README.md             # Questo file
```

## 🔍 Ottimizzazioni SEO e AI

### Structured Data Implementati
- **Organization Schema**: Dati aziendali completi
- **LocalBusiness Schema**: Informazioni attività locale
- **Service Schema**: Catalogo servizi strutturato
- **FAQ Schema**: Domande frequenti marcate
- **Article Schema**: Articoli blog ottimizzati
- **BreadcrumbList Schema**: Navigazione strutturata

### Meta Tags Avanzati
- **Open Graph** completo per social media
- **Twitter Cards** ottimizzate
- **Geo Tags** per SEO locale
- **Canonical URLs** per evitare contenuti duplicati
- **Robots meta** per controllo indicizzazione

### Performance Ottimizzazioni
- **Preconnect** per risorse esterne
- **DNS Prefetch** per domini terzi
- **Preload** per risorse critiche
- **Lazy Loading** per immagini
- **WebP** per immagini ottimizzate
- **Critical CSS** inline

### Accessibilità WCAG 2.1 AA
- **Skip Links** per navigazione rapida
- **ARIA Labels** completi
- **Semantic HTML5** strutturato
- **Focus Management** ottimizzato
- **Screen Reader** supporto completo
- **Keyboard Navigation** funzionale
- **Color Contrast** conforme

## 🔧 Come Aggiungere Contenuti

### Nuovo Articolo Blog

1. **Usa il template esistente**:
   - Copia `blog/template.html`
   - Rinomina: `blog/nome-articolo-seo-friendly.html`

2. **Personalizza i metadati**:
   - Title: max 60 caratteri, include keyword principale
   - Description: 150-160 caratteri, call-to-action
   - Keywords: 5-10 parole chiave rilevanti
   - JSON-LD Schema: dati articolo completi
   - Open Graph: immagini 1200x630px

3. **Scrivi il contenuto**:
   - Struttura H1 > H2 > H3 gerarchica
   - Paragrafi max 3-4 righe
   - Liste puntate per leggibilità
   - Blockquote per citazioni importanti
   - Alt text descrittivi per immagini

4. **Aggiorna i link**:
   - Aggiungi in `blog/index.html`
   - Categoria corretta per filtri
   - Data 2025 per coerenza
   - Aggiorna `sitemap.xml`

### Ottimizzazione Immagini
- **Formato**: WebP per web, PNG per loghi
- **Dimensioni**: max 1920px larghezza
- **Compressione**: 80-85% qualità
- **Alt Text**: descrittivo e keyword-friendly
- **Lazy Loading**: per tutte le immagini non critiche

### Aggiornare Servizi

1. **Contenuto**: 
   - Descrizioni orientate ai benefici
   - Keywords naturali integrate
   - Call-to-action chiari

2. **Schema Markup**:
   - Service Schema per ogni servizio
   - Offer Schema per preventivi
   - Review Schema se disponibili

3. **Immagini**:
   - WebP ottimizzate
   - Alt text con keywords
   - Dimensioni responsive

### Modificare Contatti

**File da aggiornare**:
- `index.html`: sezione contatti e schema
- `privacy-policy.html`: dati titolare
- `cookie-policy.html`: informazioni azienda
- `note-legali.html`: dati societari
- `assets/site.webmanifest`: informazioni app

## 🚀 Deploy e Manutenzione

### Performance
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Lighthouse Score**: target 95+ per tutte le metriche
- **WebP Images**: conversione automatica
- **CSS/JS Minification**: build process ottimizzato
- **CDN**: considera Cloudflare per performance globali

### SEO
- **Google Search Console**: monitoraggio errori e performance
- **Bing Webmaster Tools**: indicizzazione Microsoft
- **Schema Validator**: test structured data
- **Rich Results Test**: verifica snippet arricchiti
- **Mobile-Friendly Test**: compatibilità mobile
- **Page Speed Insights**: ottimizzazioni performance

### Analytics
- **GA4 Setup**: sostituisci `GA_MEASUREMENT_ID`
- **Enhanced Ecommerce**: per tracking conversioni
- **Custom Events**: form submissions, phone clicks
- **Goal Tracking**: preventivi, contatti, chiamate
- **Audience Segments**: comportamento utenti

### Local SEO
- **Google My Business**: profilo completo e aggiornato
- **Recensioni**: strategia raccolta feedback
- **NAP Consistency**: nome, indirizzo, telefono uniformi
- **Local Citations**: directory locali e settoriali
- **Geo-targeting**: contenuti specifici per zona

### GDPR Compliance
- **Privacy Policy**: revisione annuale obbligatoria
- **Cookie Consent**: granulare per tipologia
- **Data Retention**: politiche conservazione dati
- **User Rights**: procedure per richieste GDPR
- **Audit Trail**: log delle attività di trattamento

## 🔒 Sicurezza

- **HTTPS obbligatorio** per tutti gli ambienti
- **Security Headers**: CSP, HSTS, X-Frame-Options
- **Form Protection**: CSRF tokens, rate limiting
- **Input Validation**: sanitizzazione lato client/server
- **SSL Certificate**: certificato valido e aggiornato
- **Backup Strategy**: backup automatici giornalieri

## 🎯 SEO Local

### Keywords Target
- **Primarie**: "pulizie Pisa", "pulizie professionali Pisa"
- **Secondarie**: "sanificazioni Pisa", "pulizie industriali Pisa", "pulizie civili Pisa"
- **Long-tail**: "servizi pulizie casa Pisa", "impresa pulizie uffici Pisa", "pulizie condomini Pisa"
- **Geo-specifiche**: "pulizie Vicopisano", "pulizie Cascina", "pulizie San Giuliano Terme"

### Google My Business
- **Profilo Completo**: orari, servizi, foto, descrizione
- **Recensioni Strategy**: follow-up clienti, risposta tempestiva
- **Google Posts**: aggiornamenti settimanali su servizi/offerte
- **Q&A Management**: risposte proattive alle domande
- **Insights Monitoring**: analisi performance e ricerche

### Competitor Analysis
- **Keyword Gap**: opportunità non coperte
- **Content Strategy**: analisi contenuti competitor
- **Backlink Profile**: opportunità link building
- **Local Pack**: posizionamento vs competitor
- **Review Monitoring**: sentiment analysis settore

## 📊 Monitoraggio

### Metriche da Monitorare
- **Organic Traffic**: crescita traffico qualificato
- **Keyword Rankings**: posizioni keywords target
- **Local Pack**: visibilità ricerche locali
- **Conversion Rate**: form submissions, chiamate
- **Core Web Vitals**: LCP, FID, CLS
- **User Experience**: bounce rate, session duration
- **Mobile Performance**: usabilità dispositivi mobili

### Strumenti Consigliati
- **Analytics**: Google Analytics 4, Hotjar
- **SEO**: Google Search Console, SEMrush, Ahrefs
- **Local**: Google My Business, BrightLocal
- **Technical**: PageSpeed Insights, GTmetrix
- **Validation**: Schema Validator, W3C Validator
- **Monitoring**: Google Alerts, Mention

### KPI Dashboard
- **Traffic**: sessioni organiche, utenti unici
- **Rankings**: posizioni top 10 keywords
- **Conversions**: lead qualificati, ROI
- **Technical**: uptime, velocità caricamento
- **Local**: visualizzazioni GMB, azioni utente

## 🤖 Ottimizzazione AI

### Structured Data Avanzati
- **Knowledge Graph**: entità aziendali strutturate
- **Rich Snippets**: FAQ, recensioni, eventi
- **Voice Search**: ottimizzazione query vocali
- **Featured Snippets**: contenuti posizione zero
- **Local Pack**: informazioni business locali

### Content AI-Friendly
- **Semantic HTML**: markup significativo
- **Entity Recognition**: persone, luoghi, organizzazioni
- **Topic Clusters**: contenuti correlati linkati
- **Intent Matching**: contenuti per intent utente
- **Natural Language**: scrittura conversazionale

### Technical AI Optimization
- **JSON-LD**: structured data machine-readable
- **Microdata**: markup inline semantico
- **RDFa**: attributi semantici HTML
- **Open Graph**: social media optimization
- **Twitter Cards**: rich media Twitter

## 📞 Supporto

Per assistenza tecnica o modifiche al sito:

**Artigea s.r.l.**  
📧 info@artigea.it  
📞 +39 346 231 9824  
📍 Pisa (PI), Toscana

**Supporto Tecnico**:
- **Hosting**: configurazione server e dominio
- **SSL**: certificati sicurezza e rinnovi
- **Backup**: strategie backup e recovery
- **Updates**: aggiornamenti sicurezza e funzionalità
- **Monitoring**: uptime e performance 24/7

---

**Versione**: 2.0  
**Ultimo aggiornamento**: Gennaio 2025  
**Compatibilità browser**: Chrome 95+, Firefox 95+, Safari 15+, Edge 95+  
**Performance Target**: Lighthouse 95+, Core Web Vitals Green  
**SEO Compliance**: Schema.org, WCAG 2.1 AA, GDPR