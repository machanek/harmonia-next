# Migracja z Netlify CMS do PayloadCMS v3

## ✅ Co zostało zrobione

### 1. Instalacja PayloadCMS v3
- ✅ Zainstalowano `payload@latest`
- ✅ Zainstalowano `@payloadcms/bundler-webpack@latest`
- ✅ Zainstalowano `@payloadcms/db-postgres@latest`
- ✅ Zainstalowano `@payloadcms/richtext-lexical@latest`
- ✅ Zainstalowano `sharp` i `graphql`

### 2. Konfiguracja
- ✅ Stworzono `payload.config.ts` z konfiguracją PostgreSQL
- ✅ Stworzono kolekcje: Users, Media, Units, ContactMessages, SiteSettings
- ✅ Stworzono funkcję Netlify `netlify/functions/payload.ts`

### 3. Kolekcje PayloadCMS

#### Users (Użytkownicy)
- Email, hasło, rola (admin/editor)
- Autentykacja wbudowana

#### Media (Pliki)
- Upload obrazów z automatycznymi rozmiarami
- Alt text i caption
- Statyczne URL `/media`

#### Units (Lokale)
- ID, budynek, lokal, piętro
- Powierzchnia, cena, cena/m²
- Status (wolny/zarezerwowany/sprzedany)
- Dodatki, plan URL, obrazy

#### ContactMessages (Wiadomości)
- Dane kontaktowe, temat, wiadomość
- Zgody (prywatność, marketing)
- Status (nowe/w trakcie/zamknięte)

#### SiteSettings (Ustawienia)
- Nazwa strony, opis, kontakt
- Obrazy hero i galerii
- SEO (tytuł, opis)

## 🔄 Następne kroki

### 1. Zmienne środowiskowe w Netlify
Dodaj w Netlify Dashboard → Site settings → Environment variables:

```
DATABASE_URI=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
PAYLOAD_PUBLIC_SERVER_URL=https://harmonia-next.netlify.app
PAYLOAD_SECRET=[RANDOM_SECRET_32_CHARS]
SUPABASE_URL=https://[PROJECT].supabase.co
SUPABASE_ANON_KEY=[ANON_KEY]
```

### 2. Deploy i test
1. Wywołaj nowy deploy w Netlify
2. Sprawdź panel admin: `https://harmonia-next.netlify.app/admin`
3. Utwórz pierwszego użytkownika administracyjnego

### 3. Migracja danych
1. **Lokale** - zaimportuj z `public/data/units/` do kolekcji Units
2. **Wiadomości** - zaimportuj z `data/contact_messages/` do ContactMessages
3. **Ustawienia** - zaimportuj z `data/site_settings/` do SiteSettings
4. **Media** - zaimportuj obrazy z `public/images/` do Media

### 4. Usunięcie Netlify CMS
Po udanej migracji:
1. Usuń `public/admin/` folder
2. Usuń `public/__forms.html`
3. Usuń `pages/admin.tsx`
4. Zaktualizuj formularz kontaktowy do PayloadCMS API

## 🚀 Korzyści PayloadCMS

- **TypeScript** - pełne wsparcie typów
- **GraphQL API** - automatycznie generowane
- **REST API** - standardowe endpointy
- **Admin panel** - nowoczesny, responsywny
- **Media management** - automatyczne optymalizacje
- **Serverless** - kompatybilny z Netlify Functions
- **PostgreSQL** - skalowalna baza danych

## 📚 Dokumentacja
- [PayloadCMS v3 Docs](https://payloadcms.com/docs)
- [Netlify Functions](https://docs.netlify.com/functions/)
- [Supabase PostgreSQL](https://supabase.com/docs/guides/database)
