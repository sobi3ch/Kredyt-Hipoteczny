/**
Obliczanie rat malejących

Raty malejące odznaczają się następującą charakterystyką: 
- posiadają stałą część kapitałową, czyli za każdym razem spłaca się taką samą kwotę kapitału. Zadłużenie obniża się o taką samą kwotę w każdym miesiącu. 
- część odsetkowa z każdym miesiącem jest mniejsza, bo odsetki są obliczane od za każdym razem niższej kwoty kapitału pozostałego do spłacenia. 
- w związku z powyższym raty maleją z upływem czasu, ponieważ część kapitałowa jest stała, a część odsetkowa spada. ﻿

Jeśli porównać raty malejące do raty równej (przy takich samych parametrach kredytu), raty malejące są zawsze wyższe w pierwszym okresie spłaty, a w końcowym okresie spłaty są mniejsze. Suma odsetek w systemie rat malejących jest zawsze niższa niż w systemie rat równych, dlatego jeśli twoja sytuacja finansowa pozwala na spłacanie wyższych rat w początkowym okresie spłaty, warto wybrać system rat malejących, ponieważ w ten sposób oszczędzisz znaczną sumę odsetek. 

Oto przykład sposobu obliczania raty malejącej kredytu. 

Kwota kredytu = 300.000 zł
Oprocentowanie w skali rocznej = 4%
Okres kredytowania = 25 lat (300 miesięcy)

Obliczenie pierwszej raty:
część kapitałowa = 300.000/(25*12) = 1000,00 zł
część odsetkowa = 300.000 * 4% * 30 / 365 = 986,30 zł
rata = 1000,00 + 986,30 = 1.986,30 zł

Obliczenie drugiej raty:
część kapitałowa = 300.000/(25*12) = 1000,00 zł
część odsetkowa = (300.000 - 1000,00) * 4% * 30 / 365 = 983,01 zł
rata = 1.983,01 zł

Obliczenie ostatniej (300-tnej) raty:
część kapitałowa = 300.000/(25*12) = 1000,00 zł
część odsetkowa = (300.000 - 299.000) * 4% * 30 / 365 = 3,29 zł
rata = 1.003,29 zł
*/

// model kredytu
window.Kredyt = Backbone.Model.extend({
  // local version for collection
  defaults: {
    kredyt: 150000,
    nieruchomosc: 200000,
    okres: 10, // months
    prowizja: 2.13,
    marza:    1.2,
    WIBOR3M:  4.97,
    RRSO: 10,
    typRaty: 'malejace'
  },
  
  initialize: function() {
    this.set('okres', this.get('okres')*12); // w miesiacach
    this.set('raty', new Raty(this.obliczRaty()));
    
    this.bind("change:kredyt", function(){
        var kredyt = this.get("kredyt");
        if(kredyt<0) {
          cl('kredyt nie moze byc ujemny');
          this.set('kredyt', 150000);
        } else if(kredyt > this.get('nieruchomosc')) {
          cl('UWAGA: wartosc kredytu jest wyzsza niz wartosc nieruchomosci!');
          cl('kredyt: '+ kredyt);
          cl('nieruchomosc: '+ this.get('nieruchomosc'));
        } else {
          cl("Wysokosc kredytu zmienila sie na " + kredyt );          
        }
    });
  },
  
  obliczRate: function() {
    return 123499;
  },
  
  obliczRaty: function() {
    var raty = new Array(),
    S = this.get('kredyt'),
    r = this.get('RRSO')/100,
    m = 12,
    q = 1+(r/m),
    n = this.get('okres'),
    czescKapitalowa = h.correct(S/n);


//rata = S * q^n * (q-1)/(q^n-1)
//S – kwota zaciągniętego kredytu
//n – ilość rat
//q – współczynnik równy 1 + (r / m), gdzie
//q^n – “q” do potęgi “n”
//r – oprocentowanie kredytu
//m – ilość rat w okresie dla którego obowiązuje oprocentowanie “r”. 
//     Najczęściej oprocentowanie podawanej jest w skali roku, 
//     a raty płacone są co miesiąc, więc “m” wtedy jest równe 12.    


    for(var i=0; i<this.get('okres'); i++) {
      var czescOdsetkowa = h.correct( (S-(i*czescKapitalowa))*r/m );
      
      raty.push({
        czescKapitalowa: czescKapitalowa,
        czescOdsetkowa: czescOdsetkowa,
        rata: h.correct(czescKapitalowa+czescOdsetkowa)
      });
    }
    return raty;
  }
  
});
