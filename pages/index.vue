<template>
  <b-container class="bv-example-row">
    <b-row class="mt-4">
      <b-col>
        <b-form-group label="Guide Wisdom (Survival) modifier">
          <b-form-input v-model.number="orientationModifier" type="number" max="20" min="0" required></b-form-input>
        </b-form-group>
        <b-form-group label="Guide Survival Roll">
          <b-form-input v-model.number="orientationRoll" type="number" max="20" min="0" required></b-form-input>
        </b-form-group>
        <b-form-group label="Region">
          <b-form-select v-model="selectedRegion" :options="regions"></b-form-select>
        </b-form-group>
        <h1>Preparations</h1>
        <b-form-group label="Misleading info from treasure hunters">
          <b-form-checkbox v-model="misleadingInfo"> Check</b-form-checkbox>
        </b-form-group>
        <b-form-group label="Info from experienced travelers">
          <b-form-checkbox v-model="experienceInfo"> Check</b-form-checkbox>
        </b-form-group>
        <b-form-group label="Research written sources">
          <b-form-checkbox v-model="researchDay1"> Day 1</b-form-checkbox>
          <b-form-checkbox v-model="researchDay1extra"> Day 1, DC succeed by 5 or more</b-form-checkbox>
          <b-form-checkbox v-model="researchDay2"> Day 2</b-form-checkbox>
          <b-form-checkbox v-model="researchDay2extra"> Day 2, DC succeed by 5 or more</b-form-checkbox>
          <b-form-checkbox v-model="researchDay3"> Day 3</b-form-checkbox>
        </b-form-group>
      </b-col>
      <b-col>
        <h1>Results</h1>
        <div v-if="!successfulOrientationCheck">
          Check Failed!
          <b-form-group label="Misfortune Roll">
            <b-form-input v-model.number="misfortuneRoll" type="number" max="20" min="0" required></b-form-input>
          </b-form-group>
          <template v-if="misfortuneRoll > 0">
            <small>{{ misfortuneModifier }} for region + {{ misfortuneRoll }} roll</small>
            <h1>{{ misfortune.title }}</h1>
            <p>{{ misfortune.description }}</p>
          </template>
        </div>
        <div>
          <h2>Ruins</h2>
          <b-form-group label="Ruins Roll">
            <b-form-input v-model.number="ruinsRoll" type="number" max="20" min="0" required></b-form-input>
            <small>{{ ruinValue }}</small>
            <p>
              {{ ruin.title }}<br/>
              perception DC: {{ ruin.investigationDC }}<br/>
              Max finds: {{ ruin.findsRollCount }}d{{ ruin.findsDice }} + {{ ruin.findsBaseValue }}
            </p>
          </b-form-group>
          <h2>Encounters</h2>
          <b-form-group label="Encounters Roll">
            <b-form-input v-model.number="encountersRoll" type="number" max="20" min="0" required></b-form-input>
            <small>{{ encounterValue }}</small>
            <p>
              {{ encounter.title }}<br/>
              perception DC: {{ encounter.perceptionDC }}<br/>
              number: {{ encounter.numberRollCount }}d{{ encounter.numberDice }} + {{ encounter.numberBaseValue }}
            </p>
            <p v-if="successfulOrientationCheck && encounter.title !== 'None'">
              The player character (or guide) with the highest Perception score can make an ability check
              against the DC indicated on the table.
              If successful, the player characters notice the other group before being detected themselves;
              if the check fails the Gamemaster gets to decide the strategy of the other group.
            </p>
            <p v-else-if="!successfulOrientationCheck && encounter.title !== 'none'">
              the Gamemaster gets to decide the strategy of the other group
            </p>
          </b-form-group>
          <h2>Enemies</h2>
          <b-form-group label="Enemies Roll">
            <b-form-input v-model.number="enemiesRoll" type="number" max="20" min="0" required></b-form-input>
            <small>{{ enemiesValue }}</small>
            <p>
              {{ enemy.title }}<br/>
              perception DC: {{ enemy.challengeRating }}<br/>
              number: {{ enemy.numberRollCount }}d{{ enemy.numberDice }} + {{ enemy.numberBaseValue }}
            </p>
          </b-form-group>
          <h2>Terrain</h2>
          <b-form-group label="Terrain Roll">
            <b-form-input v-model.number="terrainRoll" type="number" max="20" min="0" required></b-form-input>
            <small>{{ terrainValue }}</small>
          </b-form-group>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import misfortunes from "~/sources/misfortunes"
import ruins from "~/sources/ruins";
import encounters from "~/sources/encounters";
import enemies from "~/sources/enemies";

export default {
  name: 'IndexPage',
  data() {
    return {
      orientationModifier: 0,
      orientationRoll: 0,
      misfortuneRoll: 0,
      ruinsRoll: 0,
      encountersRoll: 0,
      enemiesRoll: 0,
      terrainRoll: 0,
      regions: [
        {
          text: 'Bright Davokar',
          value: 'bright',
        },
        {
          text: 'Wild Davokar',
          value: 'wild',
        },
        {
          text: 'Dark Davokar',
          value: 'dark',
        }],
      selectedRegion: null,
      misleadingInfo: false,
      experienceInfo: false,
      researchDay1: false,
      researchDay1extra: false,
      researchDay2: false,
      researchDay2extra: false,
      researchDay3: false,
    }
  },
  storage: {
    keys: [
      'orientationModifier', 'orientationRoll', 'misfortuneRoll', 'selectedRegion', 'misleadingInfo', 'experienceInfo', 'researchDay1', 'researchDay1extra', 'researchDay2', 'researchDay2extra', 'researchDay3',],
    namespace: 'symbaroum-namespace'
  },
  computed: {
    misfortune() {
      return misfortunes[this.misfortuneModifier + this.misfortuneRoll - 1];
    },
    ruin() {
      if (!this.ruinValue){ return {} }
      return ruins.find(ruin => {
        return ruin.roll.includes(this.ruinValue)
      }) || {}
    },
    enemy() {
      if (!this.enemiesValue){ return {} }
      return enemies.find(enemy => {
        return enemy.roll.includes(this.enemiesValue)
      }) || {}
    },
    encounter() {
      if (!this.encounterValue){ return {} }
      return encounters.find(encounter => {
        return encounter.roll.includes(this.encounterValue)
      }) || {}
    },
    terrain() {
      return {}
    },
    regionOrientationDC() {
      switch (this.selectedRegion) {
        case 'bright':
          return 10;
        case 'wild' :
          return 13;
        case 'dark':
          return 16;
      }
    },
    orientationValue() {
      let orientationValue = this.orientationRoll + this.orientationModifier;
      if (this.misleadingInfo) {
        orientationValue--
      }
      if (this.experienceInfo) {
        orientationValue++
      }
      if (this.researchDay1 && this.selectedRegion === 'bright') {
        orientationValue++
      }
      if (this.researchDay2 && this.selectedRegion === 'wild') {
        orientationValue++
      }
      if (this.researchDay3 && this.selectedRegion === 'dark') {
        orientationValue++
      }
      return orientationValue
    },
    successfulOrientationCheck() {
      return this.orientationValue >= this.regionOrientationDC
    },
    enemiesAndTerrainModifier() {
      let modifier = 0;
      if (this.misleadingInfo) {
        modifier++
      }
      [this.experienceInfo, this.researchDay1, this.researchDay1extra, this.researchDay2, this.researchDay2extra, this.researchDay3]
        .forEach(bool => {
          if (bool) {
            modifier--
          }
        })

      if (this.successfulOrientationCheck) {
        modifier += (this.orientationValue - this.regionOrientationDC >= 5 ? -2 : -1)
      }

      return modifier;
    },
    ruinValue() {
      return this.ruinsRoll + (this.successfulOrientationCheck ? 2 : 0) + this.eventForestRegionModifier
    },
    encounterValue() {
      return this.encountersRoll + this.eventForestRegionModifier
    },
    enemiesValue() {
      return this.enemiesRoll + this.eventForestRegionModifier + this.enemiesAndTerrainModifier
    },
    terrainValue() {
      return this.terrainRoll + this.eventForestRegionModifier + this.enemiesAndTerrainModifier
    },
    eventForestRegionModifier() {
      switch (this.selectedRegion) {
        case 'bright':
          return 0;
        case 'wild' :
          return 2;
        case 'dark':
          return 5;
      }
    },
    misfortuneModifier() {
      switch (this.selectedRegion) {
        case 'bright':
          return 0;
        case 'wild' :
          return 5;
        case 'dark':
          return 10;
      }
    }
  }
}
</script>
