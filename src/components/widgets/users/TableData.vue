<template>
  <div class="card-body">
    <!-- SEARCH AND DATA COUNT -->
    <div class="d-flex justify-content-between mb-3">
      <div>
        <span>Showing {{ rows.length }} entries</span>
      </div>
      <div class="d-flex">
        <input type="text" class="form-control me-2" placeholder="Search..." />
        <select v-model="selectedData" class="form-select" @change="displayData($event.target.value)">
          <option value="">Choose Data</option>
          <option value="customer">Customer</option>
          <option value="contract">Contract Vendor</option>
          <option value="license">Licenses</option>
          <option value="asset">Assets</option>
        </select>
      </div>
    </div>
    
    <div class="table-responsive">
      <table id="user-list-table" class="table table-striped" role="grid" data-toggle="data-table">
        <thead>
          <tr>
            <th>No</th>
            <th v-for="(column, index) in columns" :key="index">
              <input type="text" class="form-control mt-1" placeholder="Filter..." v-if="filterColumns === true" />
              {{ column.label }}
            </th>
            <th v-if="buttonEdit.visible || buttonDelete.visible" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex" :class="getRowClass(row.days_remaining)">
            <td>{{ rowIndex + 1 }}</td>
            <td v-for="(column, colIndex) in columns" :key="colIndex">
              {{ row[column.key] }}
            </td>
            <td v-if="buttonEdit.visible || buttonDelete.visible" class="text-center">
              <div class="d-flex justify-content-center">
                <a
                  class="btn btn-sm btn-icon btn-warning mx-1"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="Edit"
                  href="#"
                  title="Edit"
                  @click.prevent="openEdit(row)"
                  :disabled="buttonEdit.disable"
                  v-if="buttonEdit.visible"
                >
                  <span class="btn-inner">
                    <icon-component type="outlined" icon-name="pencil-alt" />
                  </span>
                </a>
                <a
                  class="btn btn-sm btn-icon btn-danger mx-1"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="Delete"
                  href="#"
                  @click="openDelete(row.id)"
                  title="Delete"
                  :disabled="buttonDelete.disable"
                  v-if="buttonDelete.visible"
                >
                  <span class="btn-inner">
                    <icon-component type="outlined" icon-name="trash" />
                  </span>
                </a>
              </div>
            </td>
          </tr>
          <tr v-if="!rows || rows.length === 0">
            <td :colspan="columns.length + 2" class="text-center">No data available</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGINATION -->
    <div class="d-flex justify-content-end mt-3">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: !pagination.prev_page_url }">
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(pagination.current_page - 1)"
              tabindex="-1"
              :aria-disabled="!pagination.prev_page_url"
            >
              <span aria-hidden="true">&laquo; Previous</span>
            </a>
          </li>
          <li class="page-item" :class="{ disabled: !pagination.next_page_url }">
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(pagination.current_page + 1)"
              :aria-disabled="!pagination.next_page_url"
            >
              <span aria-hidden="true">Next &raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Array,
      required: true,
      default: () => [],
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    buttonEdit: {
      type: Object,
      default: () => ({
        visible: false,
        disable: false,
      }),
    },
    buttonDelete: {
      type: Object,
      default: () => ({
        visible: false,
        disable: false,
      }),
    },
    pagination: {
      type: Object,
      required: true,
    },
    filterColumns: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      selectedData: '',
    };
  },

  methods: {
    openEdit(row) {
      this.$emit('edit', row);
    },
    openDelete(id) {
      this.$emit('delete', id);
    },
    changePage(page) {
      if (page >= 1 && page <= this.pagination.last_page) {
        this.$emit('page-changed', page);
      }
    },
    displayData(type) {
      console.log(this.selectedData);
      this.$emit('displayData', type);
    },
    getRowClass(daysRemaining) {
      const maxDays = 60;
      const oneThird = (maxDays / 3);
      const twoThirds = (maxDays / 3) * 2;

      if (daysRemaining <= oneThird) return "table-danger";
      if (daysRemaining <= twoThirds) return "table-orange";
      if (daysRemaining <= maxDays) return "table-warning";
      return "";
    },
  }
};
</script>

<style>
.table-orange {
  background-color: #ffd191; /* Warna oranye */
}
</style>
