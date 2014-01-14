
describe('start view', function() {

  var ptor = protractor.getInstance();

  beforeEach(function() {
    ptor.get('/#/');
  });

  it('should show the main menu', function() {
    expect(ptor.findElement(protractor.By.css('.list-group--item:first-child')).getText()).toBe('New Match');
    expect(ptor.findElement(protractor.By.css('.list-group--item:nth-of-type(2)')).getText()).toBe('Matches');
    expect(ptor.findElement(protractor.By.css('.list-group--item:nth-of-type(3)')).getText()).toBe('My Teams');
    expect(ptor.findElement(protractor.By.css('.list-group--item:nth-of-type(4)')).getText()).toBe('Opponents');
    expect(ptor.findElement(protractor.By.css('.list-group--item:last-child')).getText()).toBe('Profile');
  });

  it('should navigate to "Matches-New" view when link is clicked', function() {
    ptor.findElement(protractor.By.css('.list-group--item:first-child')).click();
    expect(ptor.getCurrentUrl()).toContain('/#/new-match');
  });

  it('should navigate to "Opponents" view when link is clicked', function() {
    ptor.findElement(protractor.By.css('.list-group--item:nth-of-type(4)')).click();
    expect(ptor.getCurrentUrl()).toContain('/#/opponents');
  });

//  it('should awesome', function() {
//
//    var mockingBird = function() {
//      angular.module('app').value('version', 'sad');
//    };
//
//    browser.addMockModule('app', mockingBird);
//    browser.get('/#/');
//    
//    var version = element(by.binding('version'));
//    expect(version.getText()).toEqual('This is sad');
//  });


});