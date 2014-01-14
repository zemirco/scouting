
describe('opponents add', function() {

  var ptor = protractor.getInstance();

//  beforeEach(function() {
//    ptor.get('/#/add-opponent-team');
//  });

  it('should have the title "Add opponents"', function() {
    browser.get('/#/add-opponent-team');
    expect(ptor.findElement(protractor.By.tagName('h1')).getText()).toBe('Add opponent');
  });

  it('should not show the save success alert message', function() {
    browser.get('/#/add-opponent-team');
    expect(ptor.isElementPresent(protractor.By.css('.alert'))).toBeFalsy();
  });

  it('should empty all input fields when clear button is clicked', function() {
    browser.get('/#/add-opponent-team');
    element(by.model('opponents[0].firstname')).sendKeys('John');
    element(by.model('opponents[0].lastname')).sendKeys('Wayne');
    element(by.model('opponents[1].firstname')).sendKeys('Peter');
    element(by.model('opponents[1].lastname')).sendKeys('Parker');
    // check if text is in input fields
    expect(ptor.findElement(protractor.By.id('first')).getAttribute('value')).toBe('John');
    // clear input fields
    ptor.findElement(protractor.By.css('.topcoat-button')).click();
    // check empty input fields
    expect(ptor.findElement(protractor.By.input("opponents[0].firstname")).getAttribute('value')).toBe('');
    expect(ptor.findElement(protractor.By.input("opponents[0].lastname")).getAttribute('value')).toBe('');
    expect(ptor.findElement(protractor.By.input("opponents[1].firstname")).getAttribute('value')).toBe('');
    expect(ptor.findElement(protractor.By.input("opponents[1].lastname")).getAttribute('value')).toBe('');
  });

  it('should not save a team with empty input fields', function() {
    // override notification service
    var mockNotification = function() {
      angular.module('mockNotifcation', []).factory('notification', function() {
        return {
          alert: function() {}
        }
      });
    };
    browser.addMockModule('mockNotifcation', mockNotification);
    browser.get('/#/add-opponent-team');
    element(by.css('.topcoat-button--cta')).click();
    expect(ptor.isElementPresent(protractor.By.css('.alert'))).toBeFalsy();
  });

  it('should save a team to db when save button is clicked', function() {
    browser.get('/#/add-opponent-team');
    element(by.model('opponents[0].firstname')).sendKeys('John');
    element(by.model('opponents[0].lastname')).sendKeys('Wayne');
    element(by.model('opponents[1].firstname')).sendKeys('Peter');
    element(by.model('opponents[1].lastname')).sendKeys('Parker');
    ptor.findElement(protractor.By.css('.topcoat-button--cta')).click();
    expect(ptor.isElementPresent(protractor.By.css('.alert'))).toBeTruthy();
  });

  it('should now show one team in the list of opponent teams', function() {
    browser.get('/#/opponents');
    var list = element.all(by.repeater('row in rows'));
    expect(list.count()).toEqual(1);
  });

});