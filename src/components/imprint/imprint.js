import React from 'react';
import styled from 'styled-components';
import theme from '../../theme/theme';
import { ReactComponent as LogoHackathon } from './logo-hackathon.svg';

const Container = styled.div`
  box-sizing: border-box;
  width: 70%;
  margin: 65px auto;
  padding: 50px;
  border: none;
  border-radius: ${theme.border.radius};
  background: ${theme.color.secondary};
  color: #222;

  @media screen and (max-width: ${theme.breakpoint.md}) {
    width: 80%;
  }

  @media screen and (max-width: ${theme.breakpoint.sm}) {
    width: 90%;
  }
`;

const Title = styled.h2`
  margin: 48px 0;
`;

const SubTitle = styled.h3`
  margin: 12px 0;
`;

const Address = styled.div`
  margin: 25px 0;
  font-size: 1.2rem;

  &::before {
    content: 'Verantwortlich im Sinne des Presserechts:';
    display: block;
    margin: 8px 0;
    font-size: .8rem;
  }
`;

const Copyright = styled.div`
  margin: 10px 0 30px;

  &::before {
    content: '©';
    margin: 0 4px 0 0;
  }
`;

const Paragraph = styled.div`
  margin: 6px 0;
  text-align: ${props => props.center ? 'center' : 'left'};
`;

function Imprint() {
  return(
    <Container>
      <Title>Impressum</Title>
      <Address>
        Ruben Giannotti // Pappelallee 78/79 // 10437 Berlin
      </Address>
      <Copyright>Ruben Giannotti, Oskar Schlösinger, Max Schlösinger, Patrick Remmler 2020</Copyright>
      <Paragraph>
        Enstanden im Rahmen des #WirVsVirus Hackathons.
      </Paragraph>
      <Paragraph center>
        <LogoHackathon style={{
          width: '60%',
          height: 'auto',
        }}/>
      </Paragraph>
      <SubTitle>Haftungsausschluss</SubTitle>
      <Paragraph>
        Der Autor übernimmt, obgleich die Inhalte dieser Seite mit größter Sorgfalt ausgewählt wurden,
        keinerlei Gewähr für dessen Aktualität, Richtigkeit oder Vollständigkeit.
        Die dargestellten Datensätze über medizinische Labormeldedaten
        stammen von der Johns Hopkins University,
        Center for Systems Science and Engineering (CSSE).
        Gemäß §7 I TMG ist der Autor für eigene Inhalte dieser Seite
        nach den allgemeinen Gesetzen verantwortlich.
        Es sind jedoch Haftungsansprüche gegen den Autor,
        die sich auf Schäden materieller oder ideeller Art beziehen,
        die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen verursacht wurden,
        grundsätzlich ausgeschlossen.
        Alle Angebote sind freibleibend und unverbindlich.
        Darüberhinaus behält der Autor sich vor,
        die Angebote dieser Seite ohne gesonderte Ankündigung zu verändern,
        zu ergänzen oder zu löschen.
        Auf übermittelte oder gespeicherte fremde Inhalte
        hat der Autor keinen Einfluss und übernimmt dafür keinerlei Verantwortung.
        Sollten durch die fremden Inhalte Rechte oder gesetzliche Vorschriften verletzt werden,
        wird der Autor die betreffenden Inhalte
        bei Bekanntwerden der Rechtsverletzung unverzüglich entfernen.
      </Paragraph>
      <Paragraph>
        Das Angebot dieser Seite beinhaltet Verweise auf fremde Internetseiten.
        Sofern diese nicht im Verantwortungs- oder Einflussbereich des Autors liegen,
        kann für die Inhalte der verlinkten Seiten keine Gewähr übernommen werden.
        Der Autor erklärt hiermit, dass zum Zeitpunkt der Linksetzung
        auf den verlinkten Seiten keine rechtswidirgen Inhalte erkennbar waren.
        Eine fortwährende inhaltliche Kontrolle der verlinkten Seiten ist indessen
        ohne konkrete Anhaltspunkte nicht zumutbar.
        Daher distanziert sich der Autor ausdrücklich von den fremden Seiteninhalten.
        Sollten durch diese Inhalte Rechte oder gesetzliche Vorschriften verletzt werden,
        wird der Autor derartige Links unverzüglich entfernen,
        sobald ihm die Rechtsverletzung bekannt geworden ist.
      </Paragraph>
      <SubTitle>Datenschutz</SubTitle>
      <Paragraph>
        Die Nutzung der Seite ist grundsätzlich ohne die Angabe personenbezogener Daten möglich.
        Für die Umfrage zur Erhebung von medizinischen Daten
        ist jedoch die Angabe Ihrer E-Mail-Adresse, eines Passworts und Ihrer Postleitzahl notwendig.
        Ihre E-Mail-Adresse, sowie Ihr Passwort werden
        nur in unkenntlicher Form in unserer Datenbank hinterlegt.
        Das Unkenntlichmachen erfolgt mit Hilfe einer kryptographischen Hash-Funktion.
        Inhaber der Daten haben keine Möglichkeit,
        die Klarform der E-Mail-Adresse und des Passworts zu entschlüsseln.
        Die Daten sind vollkommen anonymisiert.
        Wenn Sie nach der Registrierung Ihr Passwort zurücksetzen wollen,
        geschieht das Versenden der Anfrage an die angegebene E-Mail-Adresse
        ohne Speicherung der Klarform auf unserem Server.
        Ebenso wird bei jedem Abgleich der eingegeben E-Mail-Daten die Eingabe verschlüsselt.
        Die Postleitzahl wird zur Lokalisierung der Daten auf der Karte im Dashboard verwendet werden.
        Auf Anfrage können Nutzer dieser Seite
        die zum Zeitpunkt der Anfrage gespeicherten Daten übermittelt bekommen
        oder dessen Löschung veranlassen.
      </Paragraph>
      <Paragraph>
        Die Nutzung der im Rahmen des Impressums
        oder vergleichbarer Angaben veröffentlichten Kontaktdaten
        wie Postanschriften, Telefon- und Faxnummern sowie E-Mail-Adressen durch Dritte
        zur Übersendung von nicht ausdrücklich angefohrderten Informationen ist untersagt.
        Rechtliche Schritte gegen die Versender von Spam-E-Mails
        bei Verstößen gegen dieses Verbot sind vorbehalten.
      </Paragraph>
    </Container>
  );
}

export default Imprint;
