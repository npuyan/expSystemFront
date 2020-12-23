<template>
  <div>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="primary" ghost>Primary</Button>
    <Icon type="ios-checkmark" />
    <Icon type="ios-alarm" />
    <Row :gutter="16">
      <Col span="6">
        <Card style="width: 300px">
          <div style="text-align: center">
            <img src="../assets/logo.png" style="width: 100px;height: 100px">
            <h3>操作系统实验容器</h3>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card style="width: 300px">
          <div style="text-align: center">
            <img src="../assets/logo.png" style="width: 100px;height: 100px">
            <h3>操作系统实验容器</h3>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card style="width: 300px">
          <div style="text-align: center">
            <img src="../assets/logo.png" style="width: 100px;height: 100px">
            <h3>操作系统实验容器</h3>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card style="width: 300px">
          <div style="text-align: center">
            <img src="../assets/logo.png" style="width: 100px;height: 100px">
            <h3>操作系统实验容器</h3>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>

</style>
