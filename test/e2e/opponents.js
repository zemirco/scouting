
describe('opponents view', function() {

  var ptor = protractor.getInstance();

  beforeEach(function() {
    ptor.get('/#/opponents');
  });

  it('should have the title "Opponents"', function() {
    expect(ptor.findElement(protractor.By.tagName('h1')).getText()).toBe('Opponents');
  });

  it('should not show the undo alert message', function() {
    expect(ptor.isElementPresent(protractor.By.css('.alert'))).toBeFalsy();
  });

  it('should say that the user doesn\'t have any opponent teams yet ', function() {
    expect(ptor.findElement(protractor.By.tagName('body')).getText()).toContain('You don\'t have any opponent teams.');
  });

  it('should have an empty list group without any opponent teams', function() {
    var list = element.all(by.repeater('row in rows'));
    expect(list.count()).toEqual(0);
  });

  it('should change the route to add opponent team when button is clicked', function() {
    ptor.findElement(protractor.By.css('.topcoat-button--cta')).click();
    expect(ptor.getCurrentUrl()).toContain('/#/add-opponent-team');
  });

});