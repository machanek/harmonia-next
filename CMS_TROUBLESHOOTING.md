# CMS Troubleshooting - Harmonia Rząska

## Problem: Kolekcje są puste w CMS

### Sprawdź czy pliki istnieją:
- ✅ `data/units/` - 9 plików jednostek
- ✅ `data/site_settings/site-settings.json` - ustawienia strony
- ✅ `data/contact_messages/` - przykładowa wiadomość

### Sprawdź konfigurację CMS:
- ✅ Backend: `git-gateway`
- ✅ Branch: `next-functional`
- ✅ Local backend: `true`

### Możliwe przyczyny pustych kolekcji:

## 1. Identity i Git Gateway nie są włączone

**Sprawdź w Netlify Dashboard:**
1. Przejdź do **Site settings** → **Identity**
2. Sprawdź czy **Identity is enabled** (zielony status)
3. Przejdź do **Identity** → **Services**
4. Sprawdź czy **Git Gateway is enabled** (zielony status)

**Jeśli nie są włączone:**
1. Kliknij **Enable Identity**
2. Kliknij **Enable Git Gateway**
3. Zapisz zmiany

## 2. Branch nie jest ustawiony jako główny

**Sprawdź w Netlify Dashboard:**
1. Przejdź do **Site settings** → **Build & deploy** → **Deploy settings**
2. Sprawdź czy **Production branch** to `next-functional`
3. Jeśli nie, zmień na `next-functional`

## 3. Repository access problem

**Sprawdź w Netlify Dashboard:**
1. Przejdź do **Site settings** → **Build & deploy** → **Repository**
2. Sprawdź czy Netlify ma dostęp do repozytorium
3. Jeśli nie, połącz ponownie z GitHub

## 4. Cache problem

**Spróbuj:**
1. Wyczyść cache przeglądarki (Ctrl+F5)
2. Spróbuj w trybie incognito
3. Sprawdź czy nie ma błędów w konsoli przeglądarki

## 5. Test z local backend

**Jeśli nadal nie działa:**
1. W `public/admin/config.yml` zmień:
```yaml
backend:
  name: test-repo
  branch: next-functional

local_backend: true
```

2. Uruchom lokalnie: `npx netlify-cms-proxy-server`
3. Przejdź do `http://localhost:8080/admin`

## 6. Sprawdź logi

**W Netlify Dashboard:**
1. Przejdź do **Functions**
2. Sprawdź logi Identity i Git Gateway
3. Sprawdź czy nie ma błędów w **Deploy logs**

## 7. Sprawdź pliki w repozytorium

**Sprawdź czy pliki są w repozytorium:**
1. Przejdź do GitHub
2. Sprawdź czy folder `data/` istnieje
3. Sprawdź czy pliki są w branch `next-functional`

## 8. Test z prostą konfiguracją

**Jeśli nadal nie działa, spróbuj prostej konfiguracji:**
```yaml
backend:
  name: git-gateway
  branch: next-functional

collections:
  - name: "units"
    label: "Lokale"
    folder: "data/units"
    create: true
    format: "json"
    fields:
      - {name: "id", label: "ID", widget: "string"}
      - {name: "nr_budynku", label: "Budynek", widget: "string"}
      - {name: "nr_lokalu", label: "Lokal", widget: "string"}
      - {name: "status", label: "Status", widget: "string"}
```

## Kontakt

Jeśli problem nadal występuje, sprawdź:
- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Git Gateway Documentation](https://docs.netlify.com/visitor-access/git-gateway/)
