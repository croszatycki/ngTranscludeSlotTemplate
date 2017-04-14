# ngTranscludeSlotTemplate
Angular Directive for using ngTranscludeSlots as templates

## Dependency
* Angular

## Installation
You can install the ngTranscludeSlotTemplate with bower:
```sh
bower install ng-transclude-slot-template --save
```

or with npm:
```sh
npm install ng-transclude-slot-template --save
```

## Usage
This directive always should be child of your directive 
```html
<ng-transclude-slot-template 
  directive-source="templateRequirements"
  locals="{$item: item}"
  slot-name="myTemplate">
</ng-transclude-slot-template> 
```

* directiveSource - should contains `$tranclude` and `$scope` of top directive, where you place templates
  * `$transclude` is needed to extract template slot
  * `$scope` is needed to append template to correct scope, sometimes is needed when You are using top scope variables or methods
* locals - additional variables
* slotName - template name from top directive
 
## Example

```html
<div ng-controller="myCtrl">
  <my-driective list="list">
    <my-template>
      <a ng-href="{{$item.url}}">{{$item.label}}</a>
    </my-template>
  </my-driective>
  
  <my-driective list="list">
    <my-template>
      <a ng-href="{{$item.url}}">{{$item.label}} ({{$item.url}})</a>
    </my-template>
  </my-driective>
</div>
```

```javascript
angular
  .module('myApp', [
      'ngTranscludeSlotTemplate'
  ])
  .controller('myCtrl', myCtrl)
  .directive('myDirective', myDirective);
  
  function myCtrl($scope){
    $scope.list = [
        {
            label: 'Item 1',
            url: 'github.com'
        },
        {
            label: 'Item 2',
            url: 'bower.io'
        }
    ]
  }
  
  function myDirective(){
      return {
          restrict: 'E',
          transclude: {
            myTemplate: 'myTemplate'
          },
          template: '' + 
            '<ul>' + 
            '  <li ng-repeat="item in list">' + 
            '    <ng-transclude-slot-template ' +
            '      directive-source="templateRequirements"' +
            '      locals="{$item: item}"' +
            '      slot-name="myTemplate">' +
            '      </ng-transclude-slot-template>' + 
            '  </li>' + 
            '</ul>',
          scope: {
              list: '='
          },
          controller: function($scope, $transclude){
              $scope.templateRequirements = {
                $scope: $scope,
                $transclude: $transclude
              };
          }
      }
  }
```

License
----

MIT
