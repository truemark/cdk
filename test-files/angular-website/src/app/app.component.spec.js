"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const app_component_1 = require("./app.component");
describe('AppComponent', () => {
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
        }).compileComponents();
    });
    it('should create the app', () => {
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    it(`should have as title 'angular-website'`, () => {
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('angular-website');
    });
    it('should render title', () => {
        var _a;
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect((_a = compiled.querySelector('.content span')) === null || _a === void 0 ? void 0 : _a.textContent).toContain('angular-website app is running!');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQWdEO0FBQ2hELHFEQUE4RDtBQUM5RCxtREFBK0M7QUFFL0MsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7SUFDNUIsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3BCLE1BQU0saUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUNuQyxPQUFPLEVBQUU7Z0JBQ1AsNkJBQW1CO2FBQ3BCO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLDRCQUFZO2FBQ2I7U0FDRixDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7UUFDL0IsTUFBTSxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsNEJBQVksQ0FBQyxDQUFDO1FBQ3RELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0NBQXdDLEVBQUUsR0FBRyxFQUFFO1FBQ2hELE1BQU0sT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDRCQUFZLENBQUMsQ0FBQztRQUN0RCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7O1FBQzdCLE1BQU0sT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDRCQUFZLENBQUMsQ0FBQztRQUN0RCxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEIsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQTRCLENBQUM7UUFDdEQsTUFBTSxPQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLDBDQUFFLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQzVHLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXN0QmVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7IFJvdXRlclRlc3RpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXIvdGVzdGluZyc7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuXG5kZXNjcmliZSgnQXBwQ29tcG9uZW50JywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBUZXN0QmVkLmNvbmZpZ3VyZVRlc3RpbmdNb2R1bGUoe1xuICAgICAgaW1wb3J0czogW1xuICAgICAgICBSb3V0ZXJUZXN0aW5nTW9kdWxlXG4gICAgICBdLFxuICAgICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudFxuICAgICAgXSxcbiAgICB9KS5jb21waWxlQ29tcG9uZW50cygpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGNyZWF0ZSB0aGUgYXBwJywgKCkgPT4ge1xuICAgIGNvbnN0IGZpeHR1cmUgPSBUZXN0QmVkLmNyZWF0ZUNvbXBvbmVudChBcHBDb21wb25lbnQpO1xuICAgIGNvbnN0IGFwcCA9IGZpeHR1cmUuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgZXhwZWN0KGFwcCkudG9CZVRydXRoeSgpO1xuICB9KTtcblxuICBpdChgc2hvdWxkIGhhdmUgYXMgdGl0bGUgJ2FuZ3VsYXItd2Vic2l0ZSdgLCAoKSA9PiB7XG4gICAgY29uc3QgZml4dHVyZSA9IFRlc3RCZWQuY3JlYXRlQ29tcG9uZW50KEFwcENvbXBvbmVudCk7XG4gICAgY29uc3QgYXBwID0gZml4dHVyZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICBleHBlY3QoYXBwLnRpdGxlKS50b0VxdWFsKCdhbmd1bGFyLXdlYnNpdGUnKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZW5kZXIgdGl0bGUnLCAoKSA9PiB7XG4gICAgY29uc3QgZml4dHVyZSA9IFRlc3RCZWQuY3JlYXRlQ29tcG9uZW50KEFwcENvbXBvbmVudCk7XG4gICAgZml4dHVyZS5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgY29uc3QgY29tcGlsZWQgPSBmaXh0dXJlLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgZXhwZWN0KGNvbXBpbGVkLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50IHNwYW4nKT8udGV4dENvbnRlbnQpLnRvQ29udGFpbignYW5ndWxhci13ZWJzaXRlIGFwcCBpcyBydW5uaW5nIScpO1xuICB9KTtcbn0pO1xuIl19