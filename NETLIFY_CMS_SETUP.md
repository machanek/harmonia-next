# Netlify CMS Setup - Harmonia Rząska

## Problem: "Unable to access identity settings"

Ten błąd występuje, gdy Netlify CMS nie może uzyskać dostępu do ustawień tożsamości. Oto jak to naprawić:

## 1. Włącz Identity Service w Netlify

1. Przejdź do **Site settings** → **Identity**
2. Kliknij **Enable Identity**
3. W sekcji **Registration preferences** wybierz:
   - **Open** (dla testów) lub **Invite only** (dla produkcji)
4. W sekcji **External providers** możesz dodać GitHub (opcjonalnie)

## 2. Włącz Git Gateway

1. Przejdź do **Site settings** → **Identity** → **Services**
2. Kliknij **Enable Git Gateway**
3. Potwierdź włączenie

## 3. Sprawdź Branch Settings

1. Przejdź do **Site settings** → **Build & deploy** → **Deploy settings**
2. Upewnij się, że **Production branch** to `next-functional`
3. Jeśli nie, zmień na `next-functional`

## 4. Sprawdź Repository Access

1. Przejdź do **Site settings** → **Build & deploy** → **Repository**
2. Upewnij się, że Netlify ma dostęp do repozytorium
3. Jeśli nie, połącz ponownie z GitHub

## 5. Test CMS

Po wykonaniu powyższych kroków:

1. Przejdź do `https://harmonia-next.netlify.app/admin`
2. Kliknij **Login with Netlify Identity**
3. Zarejestruj się lub zaloguj
4. Powinieneś zobaczyć panel CMS

## 6. Alternatywne rozwiązanie (jeśli nadal nie działa)

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

## 7. Sprawdź logi

Jeśli nadal masz problemy:

1. Przejdź do **Functions** w Netlify Dashboard
2. Sprawdź logi Identity i Git Gateway
3. Sprawdź czy nie ma błędów w **Deploy logs**

## Kontakt

Jeśli problem nadal występuje, sprawdź:
- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Git Gateway Documentation](https://docs.netlify.com/visitor-access/git-gateway/)
