<template>
  <div class="card-body">
    <div class="table-responsive">
      <table id="user-list-table" class="table table-striped" role="grid" data-toggle="data-table">
        <thead>
          <tr>
            <th>No</th>
            <th v-for="(column, index) in columns" :key="index">
              {{ column.label }}
            </th>
            <th v-if="buttonEdit.visible === true || buttonDelete.visible === true" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td>{{ rowIndex + 1 }}</td>
            <td v-for="(column, colIndex) in columns" :key="colIndex">
              {{ row[column.key] }}
            </td>
            <td v-if="buttonEdit.visible === true || buttonDelete.visible === true" class="text-center">
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
          <tr v-if="rows && rows.length === 0 || !rows">
            <td :colspan="columns ? columns.length + 2 : 1" class="text-center">No data available</td>
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
    },
    columns: {
      type: Array,
      required: true,
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
  },
};
</script>
