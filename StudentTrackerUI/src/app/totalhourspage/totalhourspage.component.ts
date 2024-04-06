import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { formatLabel, escapeLabel } from '@swimlane/ngx-charts';

interface HoursData {
  [key: string]: {

  }[];
}

type ChartData = {
  name: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-totalhourspage',
  templateUrl: './totalhourspage.component.html',
  styleUrl: './totalhourspage.component.scss'
})
export class TotalhourspageComponent implements OnInit {

  @ViewChild('chartContainer') chartContainer!: ElementRef;
  hoursData: {[key:string]:any[]} = {};
  hoursDataKeys: any[] = [];
  completeHoursData: any[] = [];
  selectedOrganization: string = "";
  totalHoursSum: number = 0;
  view: any;
  showLegend = true;
  legendTitle = 'Legend';
  legendPosition = 'right';
  animations: boolean = true;
  gradient = false;
  tooltipDisabled = false;
  arcWidth = 0.54;
  explodeSlices = false;

  colorSchemeTotal = [
    {
      name:'Completed Percentage',
      value:'#1E88E5'
    },
    {
      name:'Required Percentage',
      value:'#ffffff'
    }
  ];

  totalHoursData = [
    {
      name: 'Completed Percentage',
      value: 55,
      color: '#1E88E5'
    },
    {
      name: 'Required Percentage',
      value: 45,
      color: '#ffffff'
    },
  ];

  colorSchemeIndividual = [
    {
      name:'Restricted',
      value: '#b5fdef'
    },
    {
      name:'Unrestricted',
      value: '#c6b3f7'
    },
  ];

  individualHoursData = [
    {
      name: 'Restricted',
      value: 53.8,
      color: '#b5fdef'
    },
    {
      name: 'Unrestricted',
      value: 46.2,
      color: '#c6b3f7'
    },
  ];

  colorSchemeSupervised = [
    {
      name:'Independent',
      value:'#b5fdef'
    },
    {
      name:'Supervised',
      value:'#c6b3f7'
    }
  ];

  supervisedHoursData = [
    {
      name: 'Independent',
      value: 35.9,
      color: '#b5fdef'
    },
    {
      name: 'Supervised',
      value: 64.1,
      color: '#c6b3f7'
    },
  ];

  constructor(private router: ActivatedRoute, private route: Router, private dataservice: DataService, private cdr: ChangeDetectorRef, private store: Store) {}


  ngOnInit(): void {
    this.getHoursData();
    this.selectedOrganization = history.state.organization;
    this.cdr.detectChanges();
  }

  getHoursData() {
    const hours$ = this.dataservice.getHoursData(JSON.parse(sessionStorage.getItem('user')!).email);
    console.log("Fetched total hours:", hours$);

    forkJoin([hours$]).subscribe(
      ([hoursData]) => {
        console.log('Fetched total hours summary: ', hoursData.data);

        this.completeHoursData = hoursData.data;

        this.totalHoursSum += this.totalSum('t-independent') + this.totalSum('t-supervised');

        const tempHoursData: {[key:string]:any[]} = {};

        this.completeHoursData.forEach((item) => {
          const key = `${new Date(item.date).getFullYear()}-${new Date(item.date).getMonth() + 1}`;

          if (!tempHoursData[key]) {
            tempHoursData[key] = [];
          }

          tempHoursData[key].push(item);
        });

        console.log("Temp Hours Data:", tempHoursData);

        const dateKeys = Object.keys(tempHoursData).map(key => {
          const keyArr = key.split("-");
          return new Date(parseInt(keyArr[0]), parseInt(keyArr[1])-1);
        });
        if(dateKeys.length > 1)
          dateKeys.sort((a, b) => b.getTime() - a.getTime());
          dateKeys.forEach(dateKey => {
          const formattedKey = `${dateKey.getFullYear()}-${dateKey.getMonth() + 1}`;
          console.log(dateKey, formattedKey)

          this.hoursData[formattedKey] = tempHoursData[formattedKey];
        });

        this.hoursDataKeys = Object.keys(this.hoursData);

        console.log("Completed Hours :", dateKeys, "\n", this.hoursData, "\n", this.hoursDataKeys);

        this.setPlotValues();

      },
      error => {
        console.error('Error fetching hours summaries:', error);
      }
    );
  }

  setPlotValues() {
    const tempTotalHoursData = this.totalHoursData.map(h => ({ ...h }));

    tempTotalHoursData.forEach(h => {
        if (h.name == 'Completed Percentage')
            h.value = Math.round((this.totalHoursSum / 20) * 100) / 100;
        else
            h.value = Math.round((100 - this.totalHoursSum / 20) * 100) / 100;
    });

    this.totalHoursData = tempTotalHoursData;
    this.cdr.detectChanges();
    console.log("After total hours data update:", this.totalHoursData);

    const tempIndividualHoursData = this.individualHoursData.map(h => ({ ...h }));

    tempIndividualHoursData.forEach(h => {
      if(h.name == 'Restricted')
        h.value = this.restrictedSum() / (this.unrestrictedSum() + this.restrictedSum()) * 100;
      else
        h.value = this.unrestrictedSum() / (this.unrestrictedSum() + this.restrictedSum()) * 100;
    })

    this.individualHoursData = tempIndividualHoursData;
    this.cdr.detectChanges();

    const tempSupervisedHoursData = this.supervisedHoursData.map(h => ({ ...h }));

    tempSupervisedHoursData.forEach(h => {
      if(h.name == 'Independent')
        h.value = this.totalSum('t-independent') / (this.totalSum('t-independent') + this.totalSum('t-supervised')) * 100;
      else
        h.value = this.totalSum('t-supervised') / (this.totalSum('t-independent') + this.totalSum('t-supervised')) * 100;
    })

    this.supervisedHoursData = tempSupervisedHoursData;
    this.cdr.detectChanges();

    console.log(this.totalHoursData, "\n", this.individualHoursData, "\n", this.supervisedHoursData);
    this.cdr.detectChanges();
  }

  valueFormatting(value: number): string {
    return `${Math.round(value).toLocaleString()} €`;
  }

  onLegendLabelClick(entry: any) {
    console.log('Legend clicked', entry);
  }

  pieTooltipText({ data }: { data: ChartData }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label text-base font-extrabold">${escapeLabel(label)}</span>
      <span class="tooltip-val text-base font-medium"><span class="bg-blue-600 w-2 h-2"></span>Hours: ${val}</span>
    `;
  }

  activate(data: any) {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  deactivate(data: any) {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getTime(time: string) {
    return new Date("1970-01-01T" + time);
  }

  totalSum(attribute: string, dateKey?: string) {
    if(dateKey) {
      if(attribute == "total")
        return this.hoursData[dateKey].reduce((total, val) => total + val.restricted + val.unrestricted + val.individualRestricted + val.individualUnrestricted + val.groupUnrestricted, 0)
      else if(attribute == "t-independent")
        return this.hoursData[dateKey].reduce((total, val) => total + val.restricted + val.unrestricted, 0);
      else if(attribute == "t-supervised")
        return this.hoursData[dateKey].reduce((total, val) => total + val.individualRestricted + val.individualUnrestricted + val.groupUnrestricted, 0);
      else if(attribute == "t-groupsupervised")
        return this.hoursData[dateKey].reduce((total, val) => total + val.groupUnrestricted, 0);
    }
    if(attribute == "t-independent")
      return this.completeHoursData.reduce((total, val) => total + val.restricted + val.unrestricted, 0);
    else if(attribute == "t-supervised")
      return this.completeHoursData.reduce((total, val) => total + val.individualRestricted + val.individualUnrestricted + val.groupUnrestricted, 0);
    else if(attribute == "t-groupsupervised")
      return this.completeHoursData.reduce((total, val) => total + val.groupUnrestricted, 0);
  }

  restrictedSum(dateKey?: string) {
    if(dateKey) {
      return this.hoursData[dateKey].reduce((sum, hour) => sum + (hour.restricted || 0), 0);
    }
    return this.completeHoursData.reduce((sum, hour) => sum + (hour.restricted || 0), 0);
  }

  unrestrictedSum(dateKey?: string) {
    if(dateKey) {
      return this.hoursData[dateKey].reduce((sum, hour) => sum + (hour.unrestricted || 0), 0);
    }
    return this.completeHoursData.reduce((sum, hour) => sum + (hour.unrestricted || 0), 0);
  }

  individualRestrictedSum(dateKey?: string) {
    if(dateKey) {
      return this.hoursData[dateKey].reduce((sum, hour) => sum + (hour.individualRestricted || 0), 0);
    }
    return this.completeHoursData.reduce((sum, hour) => sum + (hour.individualRestricted || 0), 0);
  }

  individualUnrestrictedSum(dateKey?: string) {
    if(dateKey) {
      return this.hoursData[dateKey].reduce((sum, hour) => sum + (hour.individualUnrestricted || 0), 0);
    }
    return this.completeHoursData.reduce((sum, hour) => sum + (hour.individualUnrestricted || 0), 0);
  }

  groupUnrestrictedSum(dateKey?: string) {
    if(dateKey) {
      return this.hoursData[dateKey].reduce((sum, hour) => sum + (hour.groupUnrestricted || 0), 0);
    }
    return this.completeHoursData.reduce((sum, hour) => sum + (hour.groupUnrestricted || 0), 0);
  }

  contactCount(dateKey?: string) {
    if(dateKey) {
      return this.hoursData[dateKey].filter(h => h.contactType).length;
    }
    return this.completeHoursData.filter(h => h.contactType).length;
  }

  observationCount(dateKey?: string) {
    if(dateKey) {
      return this.hoursData[dateKey].filter(h => h.contactType == 'Observation').length;
    }
    return this.completeHoursData.filter(h => h.contactType == 'Observation').length;
  }

  onSelect(event: any): void {
    console.log(event);
  }

  urlRedirect(route: string) {
    this.route.navigate([route])
    .then(() => {
      window.location.reload();
    });
  }

}
