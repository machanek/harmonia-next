# Netlify CMS Setup - Harmonia Rząska

## Problem: "Unable to access identity settings"

Ten błąd występuje, gdy Netlify CMS nie może uzyskać dostępu do ustawień tożsamości. Oto jak to naprawić:

## 1. Włącz Identity Service w Netlify

**WAŻNE:** To jest kluczowy krok! Bez tego CMS nie będzie działać.

1. Przejdź do **Netlify Dashboard** → **Your Site** → **Site settings**
2. W lewym menu kliknij **Identity**
3. Kliknij **Enable Identity** (duży niebieski przycisk)
4. W sekcji **Registration preferences** wybierz:
   - **Open** (dla testów) lub **Invite only** (dla produkcji)
5. W sekcji **External providers** możesz dodać GitHub (opcjonalnie)
6. **Zapisz zmiany**

**Sprawdź czy Identity jest włączony:** Powinieneś zobaczyć zielony status "Identity is enabled"

## 2. Włącz Git Gateway

**WAŻNE:** To jest drugi kluczowy krok!

1. Przejdź do **Site settings** → **Identity** → **Services**
2. Znajdź sekcję **Git Gateway**
3. Kliknij **Enable Git Gateway**
4. Potwierdź włączenie
5. **Zapisz zmiany**

**Sprawdź czy Git Gateway jest włączony:** Powinieneś zobaczyć zielony status "Git Gateway is enabled"

## 3. Sprawdź Branch Settings

1. Przejdź do **Site settings** → **Build & deploy** → **Deploy settings**
2. Upewnij się, że **Production branch** to `next-functional`
3. Jeśli nie, zmień na `next-functional`

## 4. Sprawdź Repository Access

1. Przejdź do **Site settings** → **Build & deploy** → **Repository**
2. Upewnij się, że Netlify ma dostęp do repozytorium
3. Jeśli nie, połącz ponownie z GitHub

## 5. Zmień konfigurację CMS na git-gateway

**PO WŁĄCZENIU Identity i Git Gateway:**

1. W pliku `public/admin/config.yml` zmień:
```yaml
# Zamiast:
backend:
  name: test-repo
  branch: next-functional

# Użyj:
backend:
  name: git-gateway
  branch: next-functional
publish_mode: editorial_workflow
```

2. Usuń lub zakomentuj `local_backend: true`

## 6. Test CMS

Po wykonaniu powyższych kroków:

1. Przejdź do `https://harmonia-next.netlify.app/admin`
2. Kliknij **Login with Netlify Identity**
3. Zarejestruj się lub zaloguj
4. Powinieneś zobaczyć panel CMS

## 7. Alternatywne rozwiązanie (jeśli nadal nie działa)

Jeśli problem nadal występuje, możesz tymczasowo użyć `local_backend`:

1. W `public/admin/config.yml` zmień:
```yaml
backend:
  name: test-repo
  # name: git-gateway  # zakomentuj
  branch: next-functional

local_backend: true
```

2. Uruchom lokalnie: `npx netlify-cms-proxy-server`
3. Przejdź do `http://localhost:8080/admin`

## 8. Sprawdź logi

Jeśli nadal masz problemy:

1. Przejdź do **Functions** w Netlify Dashboard
2. Sprawdź logi Identity i Git Gateway
3. Sprawdź czy nie ma błędów w **Deploy logs**

## Kontakt

Jeśli problem nadal występuje, sprawdź:
- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Git Gateway Documentation](https://docs.netlify.com/visitor-access/git-gateway/)
